import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TurnosClient from "./TurnosClient";

export default function TurnosPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-gray-50">
        <div className="bg-black text-white py-12">
          <div className="max-w-6xl mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-black mb-2">Sacar Turno</h1>
            <p className="text-gray-400">
              Elegí el día y horario que mejor te quede. Te confirmamos por WhatsApp o email.
            </p>
          </div>
        </div>
        <TurnosClient />
      </main>
      <Footer />
    </>
  );
}
