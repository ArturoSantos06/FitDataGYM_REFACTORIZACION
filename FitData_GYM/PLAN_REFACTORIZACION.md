# Plan de refactorización FitData GYM

Rama `feature/william` desde `main`. 22 fases, una por componente, 22 commits — todos hechos por William (Claude nunca commitea). Los 22 issues se crean al final (título = nombre del archivo, sin descripción, asignados a WilliamEC, Proyecto #7).

## Fases

1. ✅ `IniciarSesion`
2. ✅ `Navegacion/BarraNavegacion`
3. ✅ `Inicio`
4. ✅ `AsignarMembresia`
5. ✅ `ListaMembresiasUsuario`
6. ✅ `AdministrarMembresias.jsx`
7. ✅ `CheckInOut.jsx`
8. ✅ `PerfilesSaludAdmin.jsx`
9. ✅ `ReportesFacturacion.jsx`
10. `src/components/administrador/registros/FormularioSaludAdmin.jsx`
11. `src/components/administrador/registros/RegistrarUsuario.jsx`
12. `src/components/administrador/registros/RegistrarEntrenador.jsx`
13. `src/components/administrador/registros/RegistrarNutriologo.jsx`
14. `src/components/pagina principal/InicioPublico.jsx`
15. `src/components/pagina principal/SobreEquipo.jsx`
16. `src/components/mantenimiento/PortalMantenimiento.jsx`
17. `src/components/mantenimiento/FormularioReporteEnChat.jsx`
18. `src/components/mantenimiento/TarjetaReporteMantenimiento.jsx`
19. `src/components/mantenimiento/VistaAdminMantenimiento.jsx`
20. `src/components/mantenimiento/VistaUsuarioMantenimiento.jsx`
21. `src/components/administrador/HistorialVentas.jsx`
22. `src/components/administrador/TarjetaProducto.jsx`

## Reglas y convenciones

- Reutilizables solo se extraen cuando ya hay 2 consumidores reales (modo ponytail, nada especulativo). Viven en `administrador/partes/reutilizables/`.
- Sin HOCs (hooks y wrappers cubren todo).
- Sin suite de tests previa; solo lógica pura extraída con Vitest si hace falta.
- Verificación por fase: `npx eslint <archivos-nuevos>` con 0 problemas + `npm run build` verde.
- Colisiones con refactors de otros compañeros (p. ej. Arturo en `registros/RegistrarNutriologo.jsx`) no bloquean: se refactoriza igual, el merge se resuelve después.

## Notas

- Fase 1 quedó fuera de la convención de carpeta-por-feature (predata la convención); no se reescribe el commit ya hecho.
- Bloqueante de seguridad sin resolver: `asegurarPerfilAdmin` no se puede eliminar hasta que corra el backfill de custom claims (ver SEC-03).
