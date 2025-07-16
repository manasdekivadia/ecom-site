import React,{createContext,useContext,useState,useEffect, Children} from 'react';

const CartContext= createContext();

export const useCart = ()=>useContext(CartContext);

export const CartProvider = ({children}) => {

    const[cartItems,setCarItems] = useState(()=>{
        const localData = localStorage.getItem('cartItems');
        return localData ? JSON.parse(localData) : [];
    });

    useEffect(()=>{
        localStorage.setItem('cartItems',JSON.stringify(cartItems));

    },[cartItems]);

    const addToCart = (item)=>{
        setCarItems((prevItems)=>{
            const ItemsInCart = prevItems.find((i)=>i._id === item._id);
            if(ItemsInCart){
                return prevItems.map((i)=>
                    i._id == item._id ? {...i,quantity:i.quantity + 1} : i
                );

            }else{
                return [...prevItems,{...item,quantity:1}];
            }
        })
    };


    const removeFromCart = (id)=>{

        setCarItems((prevItems)=>{
            return prevItems
                .map((item) => 
                    item._id === id ? { ...item, quantity: item.quantity - 1 } : item
                )
                .filter((item) => item.quantity > 0);
    });
        

    };
    
    const decreaseCartItemQuantity= (id) =>{

        setCarItems((prevItems) =>{
            return prevItems
                .map((item)=>
                    item._id === id && item.quantity >= 1 ? {...item,quantity:item.quantity -1 } : item)
                .filter((item)=>item.quantity > 0)
        });
    };

    const clearCart = () =>{
        setCarItems([]);
        localStorage.removeItem('cartItems');
    };

  return (
        <CartContext.Provider value={{
            cartItems,addToCart,removeFromCart,decreaseCartItemQuantity,clearCart
        }}>
            {children}
        </CartContext.Provider>
  )
};
