import FeaturedArticleCard from "./FeaturedArticleCard.tsx"
import {useCallback, useEffect} from "react";
import useEmblaCarousel from "embla-carousel-react";

// interface UserProps {
//     carouselData: {
//         id: number, 
//         title: string, 
//         description: string, 
//         src: string, 
//         alt: string, 
//         tags: {id: number, tagName:string}[]
//     }[]
// }

const Carousel = () => {
    
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

    const carouselData = [{id: 0, title: "Title 1", description: "description 1", src: "src/assets/article-placeholders/snowy-jap-wp.jpg", alt: "smthing 'posed to be here", tags: [{id: 0, tagName:"JS"}, {id: 1, tagName:"TS"}]},
        {id: 1, title: "Title 2", description: "description 1", src: "src/assets/article-placeholders/shintaro-kago-1.jpg", alt: "smthing 'posed to be here", tags: [{id: 0, tagName:"JS"}, {id: 1, tagName:"TS"}]},
        {id: 2, title: "Title 3", description: "description 1", src: "src/assets/article-placeholders/memes-wp-1.jpg", alt: "smthing 'posed to be here", tags: [{id: 0, tagName:"JS"}, {id: 1, tagName:"TS"}]},
        {id: 3, title: "Title 4:  How long should titles and descriptions really be? That is the question that this article will answer", description: "Description 4: How long should titles and descriptions be \ neither should too long. Titles should take a maximum of two lines and \
        descriptions should take a maximum of three in any case both should be successfully truncated with an ellipses when they are too long", src: "src/assets/article-placeholders/rin-phone-wp.png", 
        alt: "smthing 'posed to be here", tags: [{id: 0, tagName:"JS"}, {id: 1, tagName:"TS"}]},
        {id: 4, title: "Title 5", description: "description 1", src: "src/assets/article-placeholders/shintaro-kago-2.jpg", alt: "smthing 'posed to be here", tags: [{id: 0, tagName:"JS"}, {id: 1, tagName:"TS"}]},
        {id: 5, title: "Title 6", description: "description 1", src: "src/assets/article-placeholders/japanese-city.jpg", alt: "smthing 'posed to be here", tags: [{id: 0, tagName:"JS"}, {id: 1, tagName:"TS"}]}];

    return (
        <>
        {/* overflow wrapper: for more info on structure https://www.embla-carousel.com/get-started/module/#the-html-structure*/}
        <section className="overflow-hidden w-[20rem]" ref={emblaRef}>
            {/* scroll container */}
            <div className="flex flex-[0_0_100%] flex-row mt-5 *:ml-5" >
                {carouselData.map((carouselDatum) =>
                    <FeaturedArticleCard key={carouselDatum.id} carouselDatum={carouselDatum}/>
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

const slimCarousel = () => {
    const carouselData = [{id: 0, title: "Title 1", description: "description 1", src: "src/assets/article-placeholders/snowy-jap-wp.jpg", alt: "smthing 'posed to be here", tags: [{id: 0, tagName:"JS"}, {id: 1, tagName:"TS"}]},
                        {id: 1, title: "Title 2", description: "description 1", src: "src/assets/article-placeholders/shintaro-kago-1.jpg", alt: "smthing 'posed to be here", tags: [{id: 0, tagName:"JS"}, {id: 1, tagName:"TS"}]}
                        ]

    return (
        <>
        <section className="overflow-hidden w-[20rem]">
            <div className="flex flex-[0_0_100%] flex-row mt-5 *:ml-5" >
                {carouselData.map((carouselDatum) =>
                    <FeaturedArticleCard carouselDatum={carouselDatum}/>
                )
                }
            </div>
        </section>
        </>
    )
}
