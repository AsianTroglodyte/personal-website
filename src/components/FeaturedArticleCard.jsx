import Tag from "./Tag.jsx";

const FeaturedArticleCard = ({index, title, description, src, alt, tags}) => {
    // lots of different ways to pass in props. going the current way 
    // because its shorter and it makes it clearer what is a prop and derived property
    // to be fair it's not super useful here but I just think it's kinda neat
    return (
        <>
        <div className="grid grid-rows-[minmax(_22rem,_22rem)_minmax(_13rem,_13rem)] grid-cols-[minmax(_18rem,_25rem)] 
            bg-PWWhite rounded-md shadow-md 
            hover:shadow-lg" 
            key={index}>
            {/* Thumbnail. h & w need to be full as img is a container for the img. This makes object-cover work */}
            <img className="object-cover h-full w-full rounded-t-md" alt={alt} src={src}>
            
            </img>
            {/* title description thingy. Max  */}
            <div className="flex flex-col justify-between bg-white h-full w-full p-4 font-notoSerif">
                <div className="flex flex-col gap-3 overflow-hidden">
                    <h6 className="text-base font-bold max-h-12 overflow-hidden" style={{display: "-webkit-box", "-webkit-line-clamp": "2", "-webkit-box-orient":"vertical"}}>
                        {title}
                    </h6>
                    <p className="text-sm max-h-20 overflow-hidden" style={{display: "-webkit-box", "-webkit-line-clamp": "4", "-webkit-box-orient":"vertical"}}>{description}, {index}</p>
                </div>
                <div className="flex flex-row gap-1">
                    {
                        tags.map((tagData) => 
                            <Tag tagData={tagData}/>
                        )
                    }
                </div>
            </div>
        </div>
        </>
    )
}
export default FeaturedArticleCard;