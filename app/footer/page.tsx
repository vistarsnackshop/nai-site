import React from 'react';

// Define Footer as a functional component
const Footer: React.FC = () => {
  return (
    <footer className="w-full font-[sans-serif] text-[#333]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-8 py-10 max-sm:max-w-sm max-sm:mx-auto gap-y-8">
                <div className="col-span-full mb-10 lg:col-span-2 lg:mb-0">
                    <a href="https://vistar.com/"  className="flex justify-center lg:justify-start">
                        <img src='vistar-logo.png' alt="Vistar logo" className='py-4'></img>
                    </a>
                    <a href='https://vistar.com/Subnav-Contact/Contact-Us'>
                    <button
                    type="button"
                    className="w-1/2 shadow-xl py-4 px-4 text-sm font-semibold rounded-full text-white bg-vistarGreen hover:bg-vistarGreenHover focus:outline-none"
                    >
                     Contact Us
                    </button>
                    </a>
                </div>

                <div className="lg:mx-auto text-left pt-8">
                    <h4 className="text-lg text-gray-900 font-medium mb-7">Vistar</h4>
                    <ul className="text-sm  transition-all duration-500">
                        <li className="mb-6"><a href="https://vistar.com"  className="text-gray-600 hover:text-gray-900">Home</a></li>
                        <li className="mb-6"><a href="https://vistar.com/About/Page"  className=" text-gray-600 hover:text-gray-900">About</a></li>
                    </ul>
                </div>

                <div className="lg:mx-auto text-left">
                    <h4 className="text-lg text-gray-900 font-medium mb-7 pt-8">Resources</h4>
                    <ul className="text-sm  transition-all duration-500">
                        <li className="mb-6"><a href="javascript:;"  className="text-gray-600 hover:text-gray-900">Terms</a></li>
                        <li className="mb-6"><a href="javascript:;"  className=" text-gray-600 hover:text-gray-900">Privacy Policy</a></li>
                    </ul>
                </div>
            </div>

            <div className="py-7 border-t border-gray-200">
                <div className="flex items-center justify-center flex-col lg:justify-between lg:flex-row">
                    <span className="text-sm text-gray-500 ">©<a href="https://vistar.com/">Performance Food Group</a> 2024, All rights reserved.</span>
                    <div className="flex mt-4 space-x-4 sm:justify-center lg:mt-0 ">
                        <a href="https://www.linkedin.com/company/vistar-a-pfg-company"  className="w-9 h-9 rounded-full bg-gray-700 flex justify-center items-center hover:bg-vistarGreen">
                            <svg className="w-[1rem] h-[1rem] text-white" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.8794 11.5527V3.86835H0.318893V11.5527H2.87967H2.8794ZM1.59968 2.81936C2.4924 2.81936 3.04817 2.2293 3.04817 1.49188C3.03146 0.737661 2.4924 0.164062 1.61666 0.164062C0.74032 0.164062 0.167969 0.737661 0.167969 1.49181C0.167969 2.22923 0.723543 2.8193 1.5829 2.8193H1.59948L1.59968 2.81936ZM4.29668 11.5527H6.85698V7.26187C6.85698 7.03251 6.87369 6.80255 6.94134 6.63873C7.12635 6.17968 7.54764 5.70449 8.25514 5.70449C9.18141 5.70449 9.55217 6.4091 9.55217 7.44222V11.5527H12.1124V7.14672C12.1124 4.78652 10.8494 3.68819 9.16483 3.68819C7.78372 3.68819 7.17715 4.45822 6.84014 4.98267H6.85718V3.86862H4.29681C4.33023 4.5895 4.29661 11.553 4.29661 11.553L4.29668 11.5527Z" fill="currentColor"/>
                                </svg>
                                
                        </a>
                        <a href="https://www.youtube.com/@vistarapfgcompany7885"  className="w-9 h-9 rounded-full bg-gray-700 flex justify-center items-center hover:bg-vistarGreen">
                            <svg className="w-[1.25rem] h-[0.875rem] text-white" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M13.9346 1.13529C14.5684 1.30645 15.0665 1.80588 15.2349 2.43896C15.5413 3.58788 15.5413 5.98654 15.5413 5.98654C15.5413 5.98654 15.5413 8.3852 15.2349 9.53412C15.0642 10.1695 14.5661 10.669 13.9346 10.8378C12.7886 11.1449 8.19058 11.1449 8.19058 11.1449C8.19058 11.1449 3.59491 11.1449 2.44657 10.8378C1.81277 10.6666 1.31461 10.1672 1.14622 9.53412C0.839844 8.3852 0.839844 5.98654 0.839844 5.98654C0.839844 5.98654 0.839844 3.58788 1.14622 2.43896C1.31695 1.80353 1.81511 1.30411 2.44657 1.13529C3.59491 0.828125 8.19058 0.828125 8.19058 0.828125C8.19058 0.828125 12.7886 0.828125 13.9346 1.13529ZM10.541 5.98654L6.72178 8.19762V3.77545L10.541 5.98654Z" fill="currentColor"/>
                                </svg>
                                
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </footer>
  );
};

export default Footer;
