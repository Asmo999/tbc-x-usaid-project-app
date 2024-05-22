"use client";

import { handleEmptyCart } from "../../helpers/axiosProduct";

export default function EmptyCartButton() {
    return (
        <button className="text-md font-regular text-red-600" onClick={handleEmptyCart}>
            Empty Cart
        </button>
    );
}