import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServiciosClient from "./ServiciosClient";

export default function ServiciosPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-gray-50">
        <div className="bg-black text-white py-12">
          <div className="max-w-6xl mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-black mb-2">Servicios y Precios</h1>
            <p className="text-gray-400">
              Seleccioná tu vehículo para ver el precio exacto de cada servicio.
            </p>
          </div>
        </div>
        <ServiciosClient />
      </main>
      <Footer />
    </>
  );
}
