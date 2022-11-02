function TrendingPage() {
    return ( 
            <div className="trending-area fix pt-25 gray-bg">
                <div className="container mx-auto sm:px-4">
                    <div className="trending-main">
                        <div className="flex flex-wrap ">
                            <div className="lg:w-2/3 pr-4 pl-4">
                                {/* <!-- Trending Top --> */}
                                <div className="slider-active">
                                    {/* <!-- Single --> */}
                                    <div className="single-slider">
                                        <div className="trending-top mb-30">
                                            <div className="trend-top-img">
                                                <img src="assets/img/trending/trending_top2.jpg" alt=""/>
                                                <div className="trend-top-cap">
                                                    <span className="bgr" data-animation="fadeInUp" data-delay=".2s" data-duration="1000ms">Business</span>
                                                    <h2><a href="latest_news.html" data-animation="fadeInUp" data-delay=".4s" data-duration="1000ms">Anna Lora Stuns In White At Her Australian Premiere</a></h2>
                                                    <p data-animation="fadeInUp" data-delay=".6s" data-duration="1000ms">by Alice cloe   -   Jun 19, 2020</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <!-- Single --> */}
                                    <div className="single-slider">
                                        <div className="trending-top mb-30">
                                            <div className="trend-top-img">
                                                <img src="assets/img/trending/trending_top02.jpg" alt=""/>
                                                <div className="trend-top-cap">
                                                    <span className="bgr" data-animation="fadeInUp" data-delay=".2s" data-duration="1000ms">Business</span>
                                                    <h2><a href="latest_news.html" data-animation="fadeInUp" data-delay=".4s" data-duration="1000ms">Anna Lora Stuns In White At Her Australian Premiere</a></h2>
                                                    <p data-animation="fadeInUp" data-delay=".6s" data-duration="1000ms">by Alice cloe   -   Jun 19, 2020</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <!-- Single --> */}
                                    <div className="single-slider">
                                        <div className="trending-top mb-30">
                                            <div className="trend-top-img">
                                                <img src="assets/img/trending/trending_top03.jpg" alt=""/>
                                                <div className="trend-top-cap">
                                                    <span className="bgr" data-animation="fadeInUp" data-delay=".2s" data-duration="1000ms">Business</span>
                                                    <h2><a href="latest_news.html" data-animation="fadeInUp" data-delay=".4s" data-duration="1000ms">Anna Lora Stuns In White At Her Australian Premiere</a></h2>
                                                    <p data-animation="fadeInUp" data-delay=".6s" data-duration="1000ms">by Alice cloe   -   Jun 19, 2020</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <!-- Right content --> */}
                            <div className="lg:w-1/3 pr-4 pl-4">
                                    {/* <!-- Trending Top --> */}
                                <div className="flex flex-wrap ">
                                    <div className="lg:w-full pr-4 pl-4 md:w-1/2 pr-4 pl-4 sm:w-1/2 pr-4 pl-4">
                                        <div className="trending-top mb-30">
                                            <div className="trend-top-img">
                                                <img src="assets/img/trending/trending_top3.jpg" alt=""/>
                                                <div className="trend-top-cap trend-top-cap2">
                                                    <span className="bgb">FASHION</span>
                                                    <h2><a href="latest_news.html">Secretart for Economic Air
                                                        plane that looks like</a></h2>
                                                    <p>by Alice cloe   -   Jun 19, 2020</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="lg:w-full pr-4 pl-4 md:w-1/2 pr-4 pl-4 sm:w-1/2 pr-4 pl-4">
                                        <div className="trending-top mb-30">
                                            <div className="trend-top-img">
                                                <img src="assets/img/trending/trending_top4.jpg" alt=""/>
                                                <div className="trend-top-cap trend-top-cap2">
                                                    <span className="bgg">TECH </span>
                                                    <h2><a href="latest_news.html">Secretart for Economic Air plane that looks like</a></h2>
                                                    <p>by Alice cloe   -   Jun 19, 2020</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

    );
}

export default TrendingPage;