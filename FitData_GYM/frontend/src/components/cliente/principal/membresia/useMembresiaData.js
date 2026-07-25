import { useEffect, useState } from 'react';
import {
  auth,
  getUser,
  getUserByAuthUid,
  getUserByEmail,
  getMemberByUserId,
  getMemberByAuthUid,
  getUserMemberships,
  getUserMembershipsByAuthUid,
  getMembershipTypes
} from '../../../../firebase';

function buildUserData(currentUser, internalUser, internalUserId) {
  const displayName = currentUser.displayName?.split(' ') || [];
  return {
    id: internalUserId || currentUser.uid,
    email: currentUser.email,
    first_name: internalUser?.firstName || displayName[0] || '',
    last_name: internalUser?.lastName || displayName.slice(1).join(' ') || '',
    username: internalUser?.username || currentUser.email?.split('@')[0] || ''
  };
}

async function findInternalUser(currentUser) {
  const byAuthUid = await getUserByAuthUid(currentUser.uid);
  if (byAuthUid.success) return byAuthUid.data;

  const byDocumentId = await getUser(currentUser.uid);
  if (byDocumentId.success) return byDocumentId.data;

  if (currentUser.email) {
    const byEmail = await getUserByEmail(currentUser.email);
    if (byEmail.success) return byEmail.data;
  }

  return null;
}

async function findMember(currentUser, internalUserId) {
  const byAuthUid = await getMemberByAuthUid(currentUser.uid);
  if (byAuthUid.success) return byAuthUid.data;

  if (internalUserId) {
    const byUserId = await getMemberByUserId(internalUserId);
    if (byUserId.success) return byUserId.data;
  }

  const byCurrentUid = await getMemberByUserId(currentUser.uid);
  return byCurrentUid.success ? byCurrentUid.data : null;
}

function mergeMemberships(...responses) {
  const memberships = [];
  const seenIds = new Set();

  responses.forEach((response) => {
    (response.success ? response.data : []).forEach((membership) => {
      if (!seenIds.has(membership.id)) {
        seenIds.add(membership.id);
        memberships.push(membership);
      }
    });
  });

  return memberships.sort((a, b) => {
    const dateA = a.startDate ? new Date(a.startDate) : new Date(0);
    const dateB = b.startDate ? new Date(b.startDate) : new Date(0);
    return dateB - dateA;
  });
}

async function resolveMembershipType(membership) {
  const type = {
    name: membership.membershipName || membership.membershipTypeName || 'Membresía',
    duration_days: membership.durationDays ?? membership.duration_days ?? null,
    image: membership.membershipImage || membership.membershipTypeImage || membership.image || null
  };
  const typeId = String(membership.membershipTypeId || membership.membershipType || '');

  if ((type.image && type.duration_days) || !typeId) return type;

  const result = await getMembershipTypes();
  const currentType = result.success
    ? result.data.find((item) => String(item.id) === typeId)
    : null;

  if (!currentType) return type;
  return {
    name: type.name || currentType.name || 'Membresía',
    duration_days: type.duration_days ?? currentType.duration_days ?? null,
    image: type.image || currentType.image || currentType.imageUrl || currentType.image_url || null
  };
}

async function loadMembershipData(currentUser) {
  const internalUser = await findInternalUser(currentUser);
  const internalUserId = String(internalUser?.id || '');
  const user = buildUserData(currentUser, internalUser, internalUserId);
  const member = await findMember(currentUser, internalUserId);
  const [byUserId, byAuthUid] = await Promise.all([
    internalUserId ? getUserMemberships(internalUserId) : Promise.resolve({ success: true, data: [] }),
    getUserMembershipsByAuthUid(currentUser.uid, currentUser.email || null)
  ]);
  const latestMembership = mergeMemberships(byUserId, byAuthUid)[0];

  if (!latestMembership) return { user, member, membership: null };

  const type = await resolveMembershipType(latestMembership);
  return {
    user,
    member,
    membership: {
      user: currentUser.uid,
      tipo: type,
      start_date: latestMembership.startDate || latestMembership.start_date,
      end_date: latestMembership.endDate || latestMembership.end_date,
      membership_name: type.name
    }
  };
}

export default function useMembresiaData() {
  const [data, setData] = useState({ membership: null, user: null, member: null });
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(() => new Date());

  useEffect(() => {
    let isActive = true;

    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (!currentUser) {
        if (isActive) setLoading(false);
        return;
      }

      try {
        const membershipData = await loadMembershipData(currentUser);
        if (!isActive) return;
        setData(membershipData);
      } catch (error) {
        console.error('Error cargando datos:', error);
      } finally {
        if (isActive) setLoading(false);
      }
    });

    return () => {
      isActive = false;
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  return { ...data, loading, currentTime };
}
