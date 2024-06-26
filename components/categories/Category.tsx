import React from 'react';

interface CategoryProps {
    icon: any;
    name: string;
    isAllCategory?: boolean;
}

function Category({ name, isAllCategory, icon }: CategoryProps) {
    return (
        <div className={"w-[140px] h-[160px] flex flex-col font-medium font-['mtavruli'] tracking-wider items-center py-[40px] rounded-[10px] cursor-pointer " + (isAllCategory ? "bg-red justify-center text-white" : "bg-[#EAEAEA] text-black")}>
            <span>{icon}</span>
            <span className={'text-center text-[13px] px-[10px]' + (isAllCategory ? " mt-[20px]" : "")}>{name}</span>
        </div>
    );
};

export default Category;