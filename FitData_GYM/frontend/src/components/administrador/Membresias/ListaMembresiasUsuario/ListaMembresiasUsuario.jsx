import { useListaMembresias } from './hooks/useListaMembresias';
import TablaMembresiasVista from './partes/TablaMembresiasVista';

function ListaMembresiasUsuario({ refreshTrigger }) {
  const { items, busqueda, orden, onActualizar } = useListaMembresias(refreshTrigger);
  return (
    <TablaMembresiasVista
      items={items}
      busqueda={busqueda}
      orden={orden}
      onActualizar={onActualizar}
    />
  );
}

export default ListaMembresiasUsuario;
