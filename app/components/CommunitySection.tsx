"use client";

import { useState } from "react";
import Image from "next/image";
import items from "../data/items";
import CommunityModal from "./CommunityModal";
import { CommunityItem } from "../types";

export default function CommunitySection() {
  const [selectedItem, setSelectedItem] = useState<CommunityItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleItemClick = (item: CommunityItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <>
      <section className="mt-10">
        <h2 className="text-2xl font-bold mb-2">Comunidade</h2>
        <div className="flex gap-4 justify-center mt-4 flex-wrap">
          {items.map((item, index) => (
            <button
              key={index}
              onClick={() => handleItemClick(item)}
              className="group relative h-12 w-12 rounded-full bg-sky-50 p-2 hover:bg-sky-100 transition-all duration-200 hover:scale-110 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
              aria-label={`Ver detalhes sobre ${item.title}`}
            >
              <Image 
           src={`${item.icon}?v=${Date.now()}`} 
           alt={item.title} 
           width={32} 
           height={32} 
           unoptimized
           priority
           className="w-8 h-8"
              />
              
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                {item.title}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
              </div>
            </button>
          ))}
        </div>
      </section>


      <CommunityModal 
        item={selectedItem} 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
      />
    </>
  );
}
