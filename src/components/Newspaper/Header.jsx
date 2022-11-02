import { FaFacebook,FaYoutube } from "react-icons/fa";
import { WiNightAltCloudyHigh } from "react-icons/wi";

function Header() {
    return ( 
        <header>
            <div className="m-0 p-0">
                 {/* <!--  --> */}
                <div class="bg-black">
                    <div class="min-h-[50px] flex justify-between items-center max-w-[1080px] mx-auto sm:px-4 h-full">
                        <div class="flex flex-wrap justify-center items-center -ml-3 -mr-3">
                            <span class="text-slate-400 text-xs relative leading-[1.8] py-0 px-[13px] transition-all items-center justify-start flex-wrap flex">
                                <span>
                                    Viet nam, Quảng Bình
                                </span>
                                <WiNightAltCloudyHigh/>
                                <span>
                                    HI 58° LO 56°
                                </span>
                            </span>

                            <a href="#" class="text-slate-400 text-xs relative leading-[1.8] py-0 px-[13px] transition-all	">
                                About
                            </a>

                            <a href="#" class="text-slate-400 text-xs relative leading-[1.8] py-0 px-[13px] transition-all	">
                                Contact
                            </a>

                            <a href="#" class="text-slate-400 text-xs relative leading-[1.8] py-0 px-[13px] transition-all	">
                                Sing up
                            </a>

                            <a href="#" class="text-slate-400 text-xs relative leading-[1.8] py-0 px-[13px] transition-all	">
                                Log in
                            </a>
                        </div>

                        <div class="-ml-1 -mr-1 flex flex-wrap justify-center items-center">
                            <a href="#" className="text-lg text-slate-400 my-0 mx-[4px]"> 
                               <FaFacebook/>
                            </a>
                            <a href="#" className="text-lg text-slate-400 my-0 mx-[4px]"> 
                                <FaYoutube/>
                            </a>
                        </div>
                    </div>
                </div>

                {/* <!--  --> */}
                <div class="wrap-logo container">
                    {/* <!-- Logo desktop -->		 */}
                    <div class="logo">
                        <h1  class="font-extrabold text-transparent text-[2.25rem] bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 text-center">
                        Trang tin tức
                        </h1>
                    </div>	
                </div>	

                {/* <!--  --> */}
			<div class="w-full h-12 relative z-[1000]">
				<div class="w-full h-12 bg-white shadow-[0_3px_8px_0_rgb(0,0,0,5%)] translate-y-0  ">
					{/* <!-- Menu desktop --> */}
					<nav class="h-12 relative max-w-[calc(100%-30px)] w-[1050px] justify-between items-center mx-auto">
						<ul class="list-none m-0 h-full flex items-center space-evenly">
							<li class="h-full relative">
								<a href="index.html" className="text-base leading-normal relative flex items-center h-full font-sans text-slate-800 py-5px px-0 my-0 mx-[18px] transition-all ">Thời sự</a>
							</li>
							<li class="h-full relative">
								<a href="category-01.html" className="text-base leading-normal relative flex items-center h-full font-sans text-slate-800 py-5px px-0 my-0 mx-[18px] transition-all">Chính trị</a>
							</li>

							<li class="h-full relative">
								<a href="category-02.html" className="text-base leading-normal relative flex items-center h-full font-sans text-slate-800 py-5px px-0 my-0 mx-[18px] transition-all">Kinh tế </a>
							</li>

							<li class="h-full relative">
								<a href="category-01.html" className="text-base leading-normal relative flex items-center h-full font-sans text-slate-800 py-5px px-0 my-0 mx-[18px] transition-all">Xã hội</a>
							</li>

                            <li class="h-full relative">
								<a href="category-02.html" className="text-base leading-normal relative flex items-center h-full font-sans text-slate-800 py-5px px-0 my-0 mx-[18px] transition-all">Chính trị</a>
							</li>

                            <li class="h-full relative">
								<a href="category-02.html" className="text-base leading-normal relative flex items-center h-full font-sans text-slate-800 py-5px px-0 my-0 mx-[18px] transition-all">Công văn</a>
							</li>

							<li class="h-full relative">
								<a href="category-02.html" className="text-base leading-normal relative flex items-center h-full font-sans text-slate-800 py-5px px-0 my-0 mx-[18px] transition-all">Thông báo khẩn</a>
							</li>
						</ul>
					</nav>
				</div>
			</div>	
            </div>
        </header>
     );
}

export default Header;