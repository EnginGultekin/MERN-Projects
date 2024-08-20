import { createContext, useContext, useEffect, useState } from 'react';

const BasketContext = createContext();


const defaultBasket = JSON.parse(localStorage.getItem('basket'))  || [];


const BasketProvider = ({ children }) => {
    const [items, setItems] = useState(defaultBasket);

    useEffect(() => {
        localStorage.setItem('basket', JSON.stringify(items));
    }, [items]);

    // Sepete Ekleme işlemi (var mı yok mu kont. yapılıyor)
    const addToBasket = (data, findBasketItem) => {
        if (!findBasketItem) {
            return setItems((prev) => [...prev, data]);
        }

        // Buaraya yollanan ürün var mı yok mu varsa çıkar yoksa ekle (liste halinde dön)
        const filtered = items.filter((item) => item._id !== findBasketItem._id);
        setItems(filtered);
    }

    // Burda sepetten silmek istediğimiz item id'sine eşit olmayanları alıyoruz 
    const removefromBasket = (item_id) => {
        const filtered = items.filter((item) => item._id !== item_id);
        setItems(filtered);
    }

    const values = {
        items,
        setItems,
        addToBasket,
        removefromBasket,
    };

    return <BasketContext.Provider value={values}>{children}</BasketContext.Provider>;
}

const useBasket = () => useContext(BasketContext);

export { BasketProvider, useBasket };

