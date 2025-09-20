import React, { useState, useEffect } from "react";

const MerchItem: React.FC<{
  name: string;
  images: string[];
  instagramReel?: string;
  formLink?: string;
}> = ({ name, images, instagramReel, formLink }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const carouselItems = instagramReel ? [...images, "instagram"] : images;

  const nextItem = () =>
    setCurrentIndex((prev) => (prev + 1) % carouselItems.length);
  const prevItem = () =>
    setCurrentIndex((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);

  useEffect(() => {
    if (carouselItems[currentIndex] === "instagram" && (window as any).instgrm) {
      (window as any).instgrm.Embeds.process();
    }
  }, [currentIndex]);

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="relative bg-white flex justify-center items-center max-h-[80vh]">
        {carouselItems[currentIndex] === "instagram" && instagramReel ? (
          <div className="w-full flex justify-center items-center">
            <blockquote
              className="instagram-media"
              data-instgrm-permalink={instagramReel}
              data-instgrm-version="14"
              style={{ margin: 0, width: "100%", maxWidth: "540px" }}
            ></blockquote>
          </div>
        ) : (
          <img
            src={carouselItems[currentIndex] as string}
            alt={name}
            className="max-h-[80vh] w-auto object-contain"
          />
        )}
        {carouselItems.length > 1 && (
          <>
            <button
              onClick={prevItem}
              className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black/50 text-white px-2 py-1 rounded-full"
            >
              ‹
            </button>
            <button
              onClick={nextItem}
              className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black/50 text-white px-2 py-1 rounded-full"
            >
              ›
            </button>
          </>
        )}
      </div>

      <div className="p-4 text-center">
        <h3 className="text-2xl font-bold">{name}</h3>
        {formLink && (
          <div className="mt-4">
            <a
              href={formLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition"
            >
              Book Now
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

const Merch: React.FC = () => {
  const products = [
    {
      name: "Robosoc T-Shirt",
      images: [
        "https://res.cloudinary.com/dfo78d53k/image/upload/v1758386567/Merch_2025_jqgjfd.jpg",
        "https://res.cloudinary.com/dfo78d53k/image/upload/v1758386729/Screenshot_2025-09-20_221449_lnbbxc.png",
        "https://res.cloudinary.com/dfo78d53k/image/upload/v1758389227/Screenshot_2025-09-20_225647_gqvjph.png",
      ],
     
      formLink:
        "https://docs.google.com/forms/d/e/1FAIpQLSeyUkg_p9NkZqNuCx-JlI2SfrBV3qI26MJd60nn03JO24UNxA/viewform",
    },
  ];

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-center mb-4">Merchandise</h1>
      <p className="text-center text-gray-600 mb-10">
        Support us by purchasing official goodies! 
      </p>
      <div className="max-w-3xl mx-auto">
        <MerchItem {...products[0]} />
      </div>
      <script async src="//www.instagram.com/embed.js"></script>
    </div>
  );
};

export default Merch;
