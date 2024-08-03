import FeaturedArticleCard from "../components/FeaturedArticleCard.jsx"
import {useCallback, useState, useEffect} from "react";
import useEmblaCarousel from "embla-carousel-react";

const Carousel = (props) => {
    const {CarouselData} = props;
    
    const [emblaRef, emblaApi] = useEmblaCarousel({loop: true});

    useEffect(() => {
        if (emblaApi) console.log(emblaApi.slideNodes());
    }, [emblaApi]);

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);



    return (
        <>
        {/* overflow wrapper: for more info on structure https://www.embla-carousel.com/get-started/module/#the-html-structure*/}
        <section className="overflow-hidden w-[40rem]" ref={emblaRef}>
            {/* scroll container */}
            <div className="flex flex-[0_0_100%] flex-row mt-5 *:ml-5" >
                {
                CarouselData.map((CarouselDatum) =>
                    <FeaturedArticleCard index={CarouselDatum.index}
                            title={CarouselDatum.title}
                            description={CarouselDatum.description} 
                            src={CarouselDatum.src} 
                            alt={CarouselDatum.alt}
                            tags={CarouselDatum.tags} />
                )
                }
            </div>
        </section>
        <div className="flex flex-row gap-5 mt-5">
            <button className="bg-white p-2" onClick={scrollPrev}>
                left
            </button>
            <button className="bg-white p-2" onClick={scrollNext}>
                right
            </button>
        </div>
        </>
    )
}

export default Carousel;