import FeaturedArticleCard from "./FeaturedArticleCard.tsx";
import {useCallback, useEffect, useRef, useState} from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaCarouselType, EmblaEventType } from 'embla-carousel';


// used for carousel scaling (very scary)
const numberWithinRange = (number: number, min: number, max: number): number => Math.min(Math.max(number, min), max)


const Carousel = () => {
    const carouselData = [{id: 0, title: "Title 1", description: "description 1", src: "src/assets/compressed-article-placeholders/snowy-jap-wp.webp", alt: "smthing 'posed to be here", tags: [{id: 0, tagName:"JS"}, {id: 1, tagName:"TS"}]},
    {id: 1, title: "Title 2", description: "description 1", src: "src/assets/compressed-article-placeholders/shintaro-kago-1.webp", alt: "smthing 'posed to be here", tags: [{id: 0, tagName:"JS"}, {id: 1, tagName:"TS"}]},
    {id: 2, title: "Porter Robinson - Hollowheart ft. Amy Millan (From the Worlds 10th Anniversary Edition)", description: "description 1", src: "src/assets/compressed-article-placeholders/memes-wp-1.webp", alt: "smthing 'posed to be here", tags: [{id: 0, tagName:"JS"}, {id: 1, tagName:"TS"}]},
    {id: 3, title: "Title 4:  How long should titles and descriptions really be? That is the question that this article will answer", description: "Description 4: How long should titles and descriptions be \
        neither should too long. Titles should take a maximum of two lines anddescriptions should take a maximum of three in any case both should be successfully truncated with an ellipses when they are too long", 
        src: "src/assets/compressed-article-placeholders/rin-phone-wp.webp", alt: "smthing 'posed to be here", tags: [{id: 0, tagName:"JS"}, {id: 1, tagName:"TS"}]},
    {id: 4, title: "The wonderfully weird world of Shintaro Kago, manga outsider", description: "Shintaro Kago doesn’t really do interviews outside of Japan. The illustrator’s work has garnered a cult following \
        around the world, celebrated for its distinct mix of horror, sci-fi and psychedelic erotica. But when the 49-year-old agrees to take a call at home in Tokyo, the idea of talking about himself or his art \
        causes clear discomfort. Little is known about his life and he speaks in halted sentences: one-line answers that convey an air of secrecy.", src: "src/assets/compressed-article-placeholders/shintaro-kago-2.webp",
        alt: "smthing 'posed to be here", tags: [{id: 0, tagName:"JS"}, {id: 1, tagName:"TS"}]},
    {id: 5, title: "The troubling ways a heatwave can warp your mind", description: "A bit of sunshine can cause many of us to dream of ice cream, sunbathing and beaches, but warm weather can also make us violent, grumpy and depressed. Why?", src: "src/assets/compressed-article-placeholders/japanese-city.webp", 

        alt: "smthing 'posed to be here", tags: [{id: 0, tagName:"JS"}, {id: 1, tagName:"TS"}]}];


    // using center for the alignment is very weird as it reformatted on screen. align: start is used instead
    const [emblaRef, emblaApi] = useEmblaCarousel({loop: true, align: "center", dragFree: true});
    const [isLoading, setIsLoading] = useState(true);

    const changeIsLoading = () => {
        setIsLoading(false);
    }


    const tweenFactor = useRef(0);
    const tweenNodes = useRef<HTMLElement[]>([]);
    const TWEEN_FACTOR_BASE = 0.1;
    // offset of 1 is required for carousel formatting. It is added later for calculations.
    const CarouselMaxLength = ((carouselData.length - 1) * 20).toString() + "rem";


    // The following functiosn are for the embla Carousel: Black Magic. Try avoiding touching them.
    const setTweenNodes = useCallback((emblaApi: EmblaCarouselType): void => {
        tweenNodes.current = emblaApi.slideNodes().map((slideNode) => {
            return slideNode.querySelector('.flex > div') as HTMLElement;
        })
    }, []);

    const setTweenFactor = useCallback((emblaApi: EmblaCarouselType) => {
        tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length;
    }, [])

    const tweenScale = useCallback(
        (emblaApi: EmblaCarouselType, eventName?: EmblaEventType) => {
            const engine = emblaApi.internalEngine();
            const scrollProgress = emblaApi.scrollProgress();
            const slidesInView = emblaApi.slidesInView();
            const isScrollEvent = eventName === 'scroll';

            emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
            let diffToTarget = scrollSnap - scrollProgress;
            const slidesInSnap = engine.slideRegistry[snapIndex];

            slidesInSnap.forEach((slideIndex) => {
                if (isScrollEvent && !slidesInView.includes(slideIndex)) return

                if (engine.options.loop) {
                engine.slideLooper.loopPoints.forEach((loopItem) => {
                    const target = loopItem.target();

                    if (slideIndex === loopItem.index && target !== 0) {
                    const sign = Math.sign(target);
        
                    if (sign === -1) {
                        diffToTarget = scrollSnap - (1 + scrollProgress);
                    }
                    if (sign === 1) {
                        diffToTarget = scrollSnap + (1 - scrollProgress);
                    }
                    }
                })
                }

                const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor.current);
                const scale = numberWithinRange(tweenValue, 0, 1).toString();

                
                const tweenNode = tweenNodes.current[slideIndex];
                tweenNode.style.transform = `scale(${scale})`;
            })
            })
        },
        []
    )

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev()
    }, [emblaApi])

    const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
    }, [emblaApi])

    useEffect(() => {
        if (!emblaApi) return

        setTweenNodes(emblaApi)
        setTweenFactor(emblaApi)
        tweenScale(emblaApi)
        
        emblaApi
        .on('reInit', setTweenNodes)
        .on('reInit', setTweenFactor)
        .on('reInit', tweenScale)
        .on('scroll', tweenScale)
        .on('slideFocus', tweenScale)

        // changing DoneLoading so that done
        changeIsLoading();

    }, [emblaApi, tweenScale])

    // Suspense would not work the carousel must exist to have the styling begin to apply
    return (
        <div className="w-full" style={{maxWidth: CarouselMaxLength}}>
            {/* grid is for overlapping buttons */}
            <div className={isLoading? "hidden":"w-full grid grid-cols-[1fr_1fr]"}>
                <div className="overflow-hidden w-full h-[42rem] col-[1_/_3] row-[1_/_2]" 
                ref={emblaRef}> 
                    <div className="flex mt-5 col-[1_/_4]" >
                    {/* using center for the alignment is very weird as it reformatted on screen. align: start is used instead*/
                            carouselData.map((carouselDatum) =>
                                <FeaturedArticleCard key={carouselDatum.id} carouselDatum={carouselDatum}/>
                            )
                            }
                    </div>
                </div>
                {/* using absolute position is a bit wonky as it will change z-index and thus interactivity
                of the carousel. positioning using flex and margin is required. for SVG, consider changing svg
                d attribute so that center is not necessary*/}
                <div className="flex justify-start col-[1_/_2] row-[1_/_2] mb-5">
                    <button className="flex justify-center items-center self-center w-12 h-12 bg-black z-10 ml-5 rounded-full" onClick={scrollPrev}>
                    <svg width="25px" height="25px" viewBox="0 0 24 24">
                        <path xmlns="http://www.w3.org/2000/svg" d="M10.122 24l-4.122-4 8-8-8-8 4.122-4 11.878 12z" 
                        stroke="white" fill="white" style={{transform:"scale(-1, 1) translate(-100%, 0px)"}}/>
                        {/* transform="scale(-1 1) translate(-800px 0px)" style={{transform:"scale(-1, 1) translate(-40px, 0px)"}}*/}
                    </svg>
                    </button>
                </div>
                <div className="flex justify-end col-[2_/_3] row-[1_/_2] mb-5">
                    <button className="flex justify-center items-center self-center w-12 h-12 bg-black z-10 mr-5 rounded-full" onClick={scrollNext}>
                    <svg width="25px" height="25px" viewBox="0 0 24 24">
                        <path xmlns="http://www.w3.org/2000/svg" d="M10.122 24l-4.122-4 8-8-8-8 4.122-4 11.878 12z" stroke="white" fill="white"/>
                    </svg>
                    </button>
                </div>
            </div>
            {isLoading &&
                <div className={"flex content-align justify-center"}>
                    <svg width="250" height="42rem" >
                        <rect x="5" y="296" width="40" height="80" rx="5" ry="5">
                        </rect>
                        <rect x="50" y="291" width="45" height="90"  rx="5" ry="5">
                        </rect>
                        <rect x="100" y="286" width="50" height="100" rx="5" ry="5">
                        </rect>
                        <rect x="155" y="291" width="45" height="90" rx="5" ry="5">
                        </rect>
                        <rect x="205" y="296" width="40" height="80" rx="5" ry="5">
                        </rect>
                        <rect x="250" y="301" width="35" height="70" rx="5" ry="5">
                        </rect>
                    </svg>
                </div>
            }
        </div>
    )
}



export default Carousel;

