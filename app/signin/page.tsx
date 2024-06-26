import Footer from "../footer/page";
import InputForm from "./inputForm";

export default function SigninPage() {
  return (
    <>
      <div className="font-[sans-serif] text-[#333]">
        <div className="min-h-screen flex flex-col items-center justify-center">
          <div className="flex flex-col items-center mb-24 mt-8">
            <img src="vistar-logo.png" alt="Vistar logo" className="mb-4" />
            <p className="text-3xl font-extrabold">
              National Account Information
            </p>
          </div>
          <div className="grid md:grid-cols-2 items-center gap-4 max-w-6xl w-full p-4 m-4 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md">
            <div className="md:max-w-md w-full sm:px-6 py-4"> 
              <InputForm/>
            </div>
            <div className="md:h-full max-md:mt-10 bg-[#000842] rounded-xl lg:p-12 p-8 relative overflow-hidden">
              <img
                src="vistar-truck.jpg"
                className="absolute inset-0 w-full h-full object-cover"
                alt="Vistar truck on login"
              />
            </div>
          </div>
          <Footer/>
        </div>
      </div>
    </>
  );
}
