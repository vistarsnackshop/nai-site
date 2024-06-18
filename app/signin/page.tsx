import Footer from "../footer/page";

export default function SigninPage() {
  return (
    <>
      <div className="font-[sans-serif] text-[#333]">
        <div className="min-h-screen flex flex-col items-center justify-center">
          <div className="flex flex-col items-center mb-24 mt-8">
            <img src="vistar-logo.png" className="mb-4" />
            <p className="text-3xl font-extrabold">
              National Account Information
            </p>
          </div>
          <div className="grid md:grid-cols-2 items-center gap-4 max-w-6xl w-full p-4 m-4 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md">
            <div className="md:max-w-md w-full sm:px-6 py-4">
              <form>
                <div className="mb-12">
                  <h3 className="text-3xl font-extrabold">Sign in</h3>
                </div>
                <div>
                  <label className="text-xs block mb-2">Username</label>
                  <div className="relative flex items-center">
                    <input
                      name="username"
                      type="text"
                      required
                      className="w-full text-sm border-b border-gray-300 focus:border-[#333] px-2 py-3 outline-none"
                      placeholder="Enter Username"
                    />
                  </div>
                </div>
                <div className="mt-8">
                  <label className="text-xs block mb-2">Password</label>
                  <div className="relative flex items-center">
                    <input
                      name="password"
                      type="password"
                      required
                      className="w-full text-sm border-b border-gray-300 focus:border-[#333] px-2 py-3 outline-none"
                      placeholder="Enter password"
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#bbb"
                      stroke="#bbb"
                      className="w-[18px] h-[18px] absolute right-2 cursor-pointer"
                      viewBox="0 0 128 128"
                    >
                      <path
                        d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                        data-original="#000000"
                      />
                    </svg>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-2 mt-5">
                  <div className="flex items-center"></div>
                  <div></div>
                </div>
                <div className="mt-12">
                  <button
                    type="button"
                    className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded-full text-white bg-vistarGreen hover:bg-vistarGreenHover focus:outline-none"
                  >
                    Sign in
                  </button>
                </div>
                <br></br>
                <div className="space-x-8 flex justify-center pt-10"></div>
              </form>
            </div>
            <div className="md:h-full max-md:mt-10 bg-[#000842] rounded-xl lg:p-12 p-8 relative overflow-hidden">
              <img
                src="vistar-truck.jpg"
                className="absolute inset-0 w-full h-full object-cover"
                alt="login-image"
              />
            </div>
          </div>
          <Footer/>
        </div>
      </div>
    </>
  );
}
