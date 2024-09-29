import FeaturedArticleCard from "./FeaturedArticleCard.tsx";
import {useCallback, useEffect, useRef, useState} from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaCarouselType, EmblaEventType } from 'embla-carousel';


// used for carousel scaling (very scary)
const numberWithinRange = (number: number, min: number, max: number): number => Math.min(Math.max(number, min), max)


const Carousel = () => {
    const carouselData = [{id: 0, title: "Title 1", description: "description 1", src: "src/assets/article-placeholders/snowy-jap-wp.jpg", alt: "smthing 'posed to be here", tags: [{id: 0, tagName:"JS"}, {id: 1, tagName:"TS"}]},
    {id: 1, title: "Title 2", description: "description 1", src: "src/assets/article-placeholders/shintaro-kago-1.jpg", alt: "smthing 'posed to be here", tags: [{id: 0, tagName:"JS"}, {id: 1, tagName:"TS"}]},
    {id: 2, title: "Porter Robinson - Hollowheart ft. Amy Millan (From the Worlds 10th Anniversary Edition)", description: "description 1", src: "src/assets/article-placeholders/memes-wp-1.jpg", alt: "smthing 'posed to be here", tags: [{id: 0, tagName:"JS"}, {id: 1, tagName:"TS"}]},
    {id: 3, title: "Title 4:  How long should titles and descriptions really be? That is the question that this article will answer", description: "Description 4: How long should titles and descriptions be \
        neither should too long. Titles should take a maximum of two lines anddescriptions should take a maximum of three in any case both should be successfully truncated with an ellipses when they are too long", 
        src: "src/assets/article-placeholders/rin-phone-wp.png", alt: "smthing 'posed to be here", tags: [{id: 0, tagName:"JS"}, {id: 1, tagName:"TS"}]},
    {id: 4, title: "The wonderfully weird world of Shintaro Kago, manga outsider", description: "Shintaro Kago doesn’t really do interviews outside of Japan. The illustrator’s work has garnered a cult following around the world, celebrated for its distinct mix of horror, sci-fi and psychedelic erotica. But when the 49-year-old agrees to take a call at home in Tokyo, the idea of talking about himself or his art causes clear discomfort. Little is known about his life and he speaks in halted sentences: one-line answers that convey an air of secrecy.", src: "src/assets/article-placeholders/shintaro-kago-2.jpg", alt: "smthing 'posed to be here", tags: [{id: 0, tagName:"JS"}, {id: 1, tagName:"TS"}]},
    {id: 5, title: "Title 6", description: "As the heat rises during the summer months, so too can the emotional temperature – something many celebrated film-makers have captured with their depictions of intense seasonal flings. bruh what da hell", src: "src/assets/article-placeholders/japanese-city.jpg", alt: "smthing 'posed to be here", tags: [{id: 0, tagName:"JS"}, {id: 1, tagName:"TS"}]}];


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

    // Strongly consider using a suspense instead
    return (
        <div className="w-full" style={{maxWidth: CarouselMaxLength}}>
            <div className={isLoading? "hidden":""}>
                <div className="overflow-hidden h-[42rem]" 
                ref={emblaRef}> 
                    <div className="flex mt-5" >
                    {/* using center for the alignment is very weird as it reformatted on screen. align: start is used instead*/
                            carouselData.map((carouselDatum) =>
                                <FeaturedArticleCard key={carouselDatum.id} carouselDatum={carouselDatum}/>
                            )
                            }
                    </div>
                </div >
                <div className="flex justify-center gap-11">
                    <button className="bg-white" onClick={scrollPrev}>
                        ScrollPrev
                    </button>
                    <button className="bg-white" onClick={scrollNext}>
                        ScrollNext
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

