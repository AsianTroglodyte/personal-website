

const WritingsSection = () => {
    const articleData = [{id: 0, title: "Is it still worth it to learn to code.", description: "description 0", date: "July 3, 2002", src: "src/assets/article-placeholders/shrimpson-boys.png", alt: "", tags: [{id: 0, tagName:"JS"}, {id: 1, tagName:"TS"}]},
    {id: 1, title: "Title 1", description: "This description is for ensuring that content is properly truncated when content would \
    otherwise overflow and ruin the look of the card. Additionally it an ellipses is stuck at the end of truncation to make clear to \
    the user that content has been cut off", src: "src/assets/article-placeholders/kon.jpg", date: "September 29, 2015", alt: "", tags: [{id: 0, tagName:"JS"}, {id: 1, tagName:"TS"}]},
    {id: 2, title: "Title 2", description: "This description is for ensuring that content is properly truncated when content would \
    otherwise overflow and ruin the look of the card. Additionally it an ellipses is stuck at the end of truncation to make clear to \
    the user that content has been cut off", src: "src/assets/article-placeholders/power-1.jpg", date: "April 4, 2016", alt: "", tags: [{id: 0, tagName:"JS"}, {id: 1, tagName:"TS"}]},
    {id: 3, title: "Title 3", description: "description 4", src: "src/assets/article-placeholders/CSM-3-rooms.jpg", date: "March 6, 2019", alt: "", tags: [{id: 0, tagName:"JS"}, {id: 1, tagName:"TS"}]},
    {id: 4, title: "Title 4", description: "description 5", src: "src/assets/article-placeholders/Cytus-wallpaper v2.png",  date: "November 25, 2016", alt: "", tags: [{id: 0, tagName:"JS"}, {id: 1, tagName:"TS"}]},
    {id: 5, title: "Deep Learning for Natural Language Processing: Techniques and Applications", description: "This description is for ensuring that content is properly truncated when content would \
    otherwise overflow and ruin the look of the card. Additionally it an ellipses is stuck at the end of truncation to make clear to \
    the user that content has been cut off", src: "src/assets/article-placeholders/lisa-wp-edit.jpg", date: "July 12, 2016", alt: "", tags: [{id: 0, tagName:"JS"}, {id: 1, tagName:"TS"}]},
    {id: 6, title: "Why is Alegria art hated so much?", description: "description 7", src: "src/assets/article-placeholders/rin-phone-wp.png", date: "September 18, 2017", alt: "", tags: [{id: 0, tagName:"JS"}, {id: 1, tagName:"TS"}]},
    {id: 7, title: "Demystifying Quantum Computing: A Beginner’s Guide", description: "description 8", src: "src/assets/article-placeholders/kita-bocchi-phone-wp-2.png", date: "February 22, 2018", alt: "", tags: [{id: 0, tagName:"JS"}, {id: 1, tagName:"TS"}]}];

    return (
        <>
            <div className="grid grid-cols-[500px_minmax(0px,1fr)]  w-[75rem] max-w-[75rem]">
                <ol className="flex flex-col px-4 w-full">
                    {articleData.map( (articleDatum) => ( 
                        <>
                        <li className="flex flex-col font-notoSerif w-full py-4">
                            <h4 className="font-semibold line-clamp-2"> {articleDatum.title} </h4>
                            {/* {articleDatum.description} */}
                            <p>{articleDatum.date}</p>
                        </li>
                        <hr className="col-span-3 border-top-[2px] border-PWBlack"></hr>
                        </>
                    ))}
                    {articleData.map( (articleDatum) => (
                        <>
                        <li className="flex flex-col font-notoSerif w-full py-4">
                            <h4 className="font-semibold line-clamp-2"> {articleDatum.title} </h4>
                            {/* {articleDatum.description} */}
                            <p>{articleDatum.date}</p>
                        </li>
                        <hr className="col-span-3 border-top-[2px] border-PWBlack"></hr>
                        </>
                    ))}
                </ol>
                <div className="h-[50rem] bg-PWBlack sticky top-0">
                    images go here
                </div>
            </div>
        </>
    )
}

export default WritingsSection;