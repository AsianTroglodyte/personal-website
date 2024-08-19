import FeaturedArticleCard from "./FeaturedArticleCard.tsx";
import {useCallback, useEffect, useLayoutEffect, useRef, useState} from "react";
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
    const [doneLoading, setDoneLoading] = useState(false);
    // console.log("emblaApi");
    // console.log(                      carouselData.map((carouselDatum) =>
    //     <FeaturedArticleCard key={carouselDatum.id} carouselDatum={carouselDatum}/>
    // ));
    // console.log(emblaApi?.slideNodes());


    const tweenFactor = useRef(0);
    const tweenNodes = useRef<HTMLElement[]>([]);
    const TWEEN_FACTOR_BASE = 0.1;

    const setTweenNodes = useCallback((emblaApi: EmblaCarouselType): void => {
        tweenNodes.current = emblaApi.slideNodes().map((slideNode) => {
            // console.log("slide nodes:");
            // console.log(slideNode.querySelector('.flex > div'));
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

    

    const changeDoneLoading = () => {
        setDoneLoading(true);
    }

    useEffect(() => {
        if (!emblaApi) return

        setTweenNodes(emblaApi)
        setTweenFactor(emblaApi)
        tweenScale(emblaApi)
        // tweenParallax(emblaApi)
        
        emblaApi
        .on('reInit', setTweenNodes)
        .on('reInit', setTweenFactor)
        .on('reInit', tweenScale)
        .on('scroll', tweenScale)
        .on('slideFocus', tweenScale)
        // .on('reInit', tweenParallax)
        // .on('scroll', tweenParallax)
        // .on('slideFocus', tweenParallax)

        // changing DoneLoading so that done
        changeDoneLoading();

    }, [emblaApi, tweenScale])


    return (

        doneLoading ? 
        (<div className="embla overflow-hidden w-[58rem] h-[42rem]" ref={emblaRef}> 
            <div className="flex mt-5 " >
            {/* using center for the alignment is very weird as it reformatted on screen. align: start is used instead*/
                    carouselData.map((carouselDatum) =>
                        <FeaturedArticleCard key={carouselDatum.id} carouselDatum={carouselDatum}/>
                    )
                    }
            </div>
        </div>)
        :
        (
        <div>
            <div className="embla overflow-hidden w-[56.5rem] h-[42rem] hidden" ref={emblaRef}> 
                <div className="flex mt-5 *:mr-5" >
                {/* using center for the alignment is very weird as it reformatted on screen. align: start is used instead*/
                        carouselData.map((carouselDatum) =>
                            <FeaturedArticleCard key={carouselDatum.id} carouselDatum={carouselDatum}/>
                        )
                        }
                </div>
            </div>
            <div className="h-[42rem] bg-gray-500">              
                <div className="text-blue-600 text-xl relative top-1/2 left-1/2 transform translate-x-[-50%] translate-y-[-50%] w-min">idk where </div>
            </div>
        </div>
        )
    )
}

export default Carousel;