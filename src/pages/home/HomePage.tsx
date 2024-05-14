import { useSelector } from "react-redux";
import { userData } from "../../utils/utilsDTOS";

export const HomePage = () => {
  const userData: userData = useSelector((state: any) => state.auth.user);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-zinc-950 via-zinc-800 to-zinc-950">
      <main className="flex-grow">
        <div className="container mx-auto py-12 px-4 pt-20 sm:px-6 lg:px-8">
          {/* Sección de imagen de servicios y llamado a la acción */}
          <div className="text-center text-white mb-8">
            <img src="imagen_servicios.jpg" alt="Servicios" className="w-64 mx-auto mb-4" />
            <p className="text-lg mb-4">Descubre nuestros servicios premium y lleva tu experiencia al siguiente nivel.</p>
            <button className="bg-white text-black py-2 px-4 rounded hover:bg-gray-300">Ver más</button>
          </div>
          {/* Sección de mostrar todos los productos */}
          <div className="text-center text-white mb-8">
            <p className="text-lg mb-4">Conoce todos nuestros productos</p>
            <button className="bg-white text-black py-2 px-4 rounded hover:bg-gray-300">Ver más</button>
          </div>
          {/* Sección de nuestras empresas */}
          <div className="text-center text-white mb-8">
            <p className="text-lg mb-4">Explora nuestras empresas asociadas</p>
            <button className="bg-white text-black py-2 px-4 rounded hover:bg-gray-300">Ver más</button>
          </div>
          {/* Sección de quiénes somos */}
          <div className="text-center text-white mb-8">
            <p className="text-lg mb-4">Descubre quiénes somos y nuestra misión</p>
            <button className="bg-white text-black py-2 px-4 rounded hover:bg-gray-300">Ver más</button>
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="text-center text-white py-4">
        <p>Derechos reservados &copy; 2024 | Nombre de tu empresa</p>
      </footer>
    </div>
  );
};