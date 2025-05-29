
export async function GET(request: Request, { params }: { params: { category: string } }) {
   const { category } = params;

   const mockImages: Record<string, { id: number; title: string; image: string }[]> = {
      bathroom: [
         { id: 1, title: "Bathroom 1", image: "/images/bathroom1.jpg" },
         { id: 2, title: "Bathroom 2", image: "/images/bathroom2.jpg" },
      ],
      bed: [
         { id: 1, title: "Bed 1", image: "/images/bed1.jpg" },
         { id: 2, title: "Bed 2", image: "/images/bed2.jpg" },
      ],
      chair: [
         { id: 1, title: "Chair 1", image: "/images/chair1.jpg" },
         { id: 2, title: "Chair 2", image: "/images/chair2.jpg" },
      ],
      crib: [
         { id: 1, title: "Crib 1", image: "/images/crib1.jpg" },
         { id: 2, title: "Crib 2", image: "/images/crib2.jpg" },
      ],
      "living-room": [
         { id: 1, title: "Living-room 1", image: "/images/living-room1.jpg" },
         { id: 2, title: "Living-room 2", image: "/images/living-room2.jpg" },
      ],
      kitchen: [
         { id: 1, title: "Kitchen 1", image: "/images/kitchen1.jpg" },
         { id: 2, title: "Kitchen 2", image: "/images/kitchen2.jpg" },
      ],
      office: [
         { id: 1, title: "Office 1", image: "/images/office1.jpg" },
         { id: 2, title: "Office 2", image: "/images/office2.jpg" },
      ],
      table: [
         { id: 1, title: "Table 1", image: "/images/table1.jpg" },
         { id: 2, title: "Table 2", image: "/images/table2.jpg" },
      ],
      "TV-stand": [
         { id: 1, title: "TV-stand 1", image: "/images/TV-stand1.jpg" },
         { id: 2, title: "TV-stand 2", image: "/images/TV-stand2.jpg" },
      ],
      wardrobe: [
         { id: 1, title: "Wardrobe 1", image: "/images/wardrobe1.jpg" },
         { id: 2, title: "Wardrobe 2", image: "/images/wardrobe2.jpg" },
      ],
      "wooden-accessories": [
         { id: 1, title: "Wooden-accessories 1", image: "/images/wooden-accessories1.jpg" },
         { id: 2, title: "Wooden-accessories 2", image: "/images/wooden-accessories2.jpg" },
      ],
   };

   return Response.json(mockImages[category] || []);
}

