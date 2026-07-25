import { useState, useEffect } from 'react';
import { getAllMembers, getHealthProfileByMemberId, createHealthProfile } from '../../../firebase';
import { db } from '../../../firebase/config';
import { collection, query, where, getDocs } from 'firebase/firestore';

// --- BASE DE DATOS Y LÓGICA MATEMÁTICA INTACTA ---
const baseDatosComidas = {
  desayunos: [
    { title: 'Avena con manzana, canela y nueces', kcal: 350, p: 12, c: 55, f: 10, time: 10 },
    { title: 'Huevos revueltos con espinaca y pan integral', kcal: 400, p: 20, c: 30, f: 22, time: 15 },
    { title: 'Yogur griego con berries y miel', kcal: 300, p: 18, c: 25, f: 14, time: 5 },
    { title: 'Tostadas de aguacate con huevo pochado', kcal: 450, p: 22, c: 40, f: 24, time: 15 },
    { title: 'Batido de proteína con plátano y avena', kcal: 380, p: 30, c: 45, f: 8, time: 5 },
  ],
  comidas: [
    { title: 'Pechuga de pollo a la plancha con arroz y brócoli', kcal: 500, p: 45, c: 50, f: 12, time: 25 },
    { title: 'Salmón al horno con quinoa y espárragos', kcal: 600, p: 40, c: 45, f: 25, time: 30 },
    { title: 'Ensalada de atún con garbanzos y vinagreta', kcal: 450, p: 35, c: 30, f: 20, time: 10 },
    { title: 'Tacos de pechuga de pavo con tortillas de maíz', kcal: 550, p: 40, c: 45, f: 22, time: 20 },
    { title: 'Pasta integral con carne de res magra molida', kcal: 650, p: 45, c: 70, f: 18, time: 25 },
  ],
  cenas: [
    { title: 'Filete de pescado blanco con vegetales al vapor', kcal: 350, p: 35, c: 15, f: 15, time: 20 },
    { title: 'Pechuga de pavo asada con ensalada verde', kcal: 300, p: 30, c: 10, f: 12, time: 20 },
    { title: 'Tortilla de claras de huevo con champiñones', kcal: 250, p: 25, c: 5, f: 10, time: 10 },
    { title: 'Queso cottage con almendras', kcal: 280, p: 25, c: 10, f: 15, time: 5 },
    { title: 'Fajitas de pollo en hojas de lechuga', kcal: 320, p: 30, c: 12, f: 14, time: 15 },
  ],
  snacks: [
    { title: 'Manzana con crema de maní', kcal: 200, p: 6, c: 25, f: 10, time: 5 },
    { title: 'Un puñado de nueces y almendras', kcal: 180, p: 5, c: 6, f: 16, time: 0 },
    { title: 'Gelatina sin azúcar y 1 porción de fresas', kcal: 100, p: 2, c: 20, f: 0, time: 5 },
    { title: 'Batido de proteína en agua', kcal: 120, p: 25, c: 3, f: 1, time: 2 },
    { title: 'Tortitas de arroz con requesón', kcal: 150, p: 10, c: 22, f: 2, time: 5 },
  ]
};

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

const generarMenuLocal = (targetCalories) => {
  const tKcal = Number(targetCalories);
  
  let desayuno = { ...getRandom(baseDatosComidas.desayunos), type: 'Desayuno' };
  let comida = { ...getRandom(baseDatosComidas.comidas), type: 'Comida' };
  let cena = { ...getRandom(baseDatosComidas.cenas), type: 'Cena' };
  
  let meals = [desayuno, comida, cena];
  let sumKcal = meals.reduce((acc, m) => acc + m.kcal, 0);

  let maxSnacks = 3;
  while (tKcal - sumKcal > 150 && maxSnacks > 0) {
    const snack = { ...getRandom(baseDatosComidas.snacks), type: 'Snack' };
    meals.push(snack);
    sumKcal += snack.kcal;
    maxSnacks--;
  }
  
  const ratio = tKcal / sumKcal;
  
  const finalMeals = meals.map((m, index) => {
    const adjustedKcal = Math.round(m.kcal * ratio);
    const servings = (ratio >= 1.3 ? 1.5 : (ratio <= 0.8 ? 0.75 : 1));
    return {
      id: `meal-${index}-${Date.now()}`,
      title: m.title,
      readyInMinutes: m.time,
      servings: servings,
      type: m.type,
      kcal: adjustedKcal,
      protein: Math.round(m.p * ratio),
      carbohydrates: Math.round(m.c * ratio),
      fat: Math.round(m.f * ratio)
    };
  });

  return {
    meals: finalMeals,
    nutrients: {
      calories: finalMeals.reduce((acc, m) => acc + m.kcal, 0),
      protein: finalMeals.reduce((acc, m) => acc + m.protein, 0),
      carbohydrates: finalMeals.reduce((acc, m) => acc + m.carbohydrates, 0),
      fat: finalMeals.reduce((acc, m) => acc + m.fat, 0)
    }
  };
};
// -----------------------------------------------------------

export default function useAsistenteNutricional() {
  const [abierto, setAbierto] = useState(false);
  const [caloriasObjetivo, setCaloriasObjetivo] = useState(2000);
  const [comidasSugeridas, setComidasSugeridas] = useState([]);
  const [nutrientesDiarios, setNutrientesDiarios] = useState(null);
  
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  const [pacientes, setPacientes] = useState([]);
  const [idPacienteSeleccionado, setIdPacienteSeleccionado] = useState('');
  const [cargandoPacientes, setCargandoPacientes] = useState(false);
  const [guardandoCalorias, setGuardandoCalorias] = useState(false);
  const [mensajeGuardado, setMensajeGuardado] = useState('');

  useEffect(() => {
    if (abierto && pacientes.length === 0) {
      const cargarPacientes = async () => {
        setCargandoPacientes(true);
        try {
          const userDataStr = localStorage.getItem('firebaseUser');
          let nutriId = null;
          
          if (userDataStr) {
            const userData = JSON.parse(userDataStr);
            nutriId = userData.uid;
          }

          const res = await getAllMembers();
          
          if (res.success && res.data) {
            if (nutriId) {
              const q = query(collection(db, 'client_nutritionist_assignments'), where('nutritionistId', '==', nutriId));
              const snap = await getDocs(q);
              const assignedClientIds = snap.docs.map(doc => doc.data().clientId);

              const miembrosAsignados = res.data.filter(m => {
                const mUserId = String(m.userId || '').trim();
                const mUser = String(m.user || '').trim();
                const mId = String(m.id || '').trim();
                return assignedClientIds.some(id => 
                  id === mUserId || id === mUser || id === mId
                );
              });
              
              if (miembrosAsignados.length === 0) {
                setPacientes(res.data);
              } else {
                setPacientes(miembrosAsignados);
              }
            } else {
              setPacientes(res.data);
            }
          } else {
            setPacientes([]);
          }
        } catch (err) {
          console.error("Error loading assigned patients:", err);
          setPacientes([]);
        } finally {
          setCargandoPacientes(false);
        }
      };
      cargarPacientes();
    }
  }, [abierto, pacientes.length]);

  const manejarCambioPaciente = async (e) => {
    const memberId = e.target.value;
    setIdPacienteSeleccionado(memberId);
    setMensajeGuardado('');
    
    if (!memberId) return;

    setCargandoPacientes(true);
    const res = await getHealthProfileByMemberId(memberId);
    // Preservamos la llave 'targetCalories' que espera Firebase
    if (res.success && res.data && res.data.targetCalories) {
      setCaloriasObjetivo(res.data.targetCalories);
    }
    setCargandoPacientes(false);
  };

  const guardarCaloriasPaciente = async () => {
    if (!idPacienteSeleccionado) return;
    setGuardandoCalorias(true);
    setMensajeGuardado('');
    
    // Mantenemos los nombres de las propiedades exactos para Firebase
    const res = await createHealthProfile({
      memberId: idPacienteSeleccionado,
      targetCalories: Number(caloriasObjetivo)
    });

    if (res.success) {
      setMensajeGuardado('Guardado en el expediente');
      setTimeout(() => setMensajeGuardado(''), 3000);
    } else {
      setMensajeGuardado('Error al guardar');
    }
    setGuardandoCalorias(false);
  };

  const obtenerSugerencias = async () => {
    setCargando(true);
    setError(null);

    setTimeout(() => {
      try {
        const data = generarMenuLocal(caloriasObjetivo);
        setComidasSugeridas(data.meals);
        setNutrientesDiarios(data.nutrients);
      } catch (err) {
        console.error(err);
        setError('Ocurrió un error generando el menú local.');
      } finally {
        setCargando(false);
      }
    }, 600);
  };

  return {
    abierto, setAbierto,
    caloriasObjetivo, setCaloriasObjetivo,
    comidasSugeridas,
    nutrientesDiarios,
    cargando, error,
    pacientes,
    idPacienteSeleccionado,
    cargandoPacientes,
    guardandoCalorias,
    mensajeGuardado,
    manejarCambioPaciente,
    guardarCaloriasPaciente,
    obtenerSugerencias
  };
}