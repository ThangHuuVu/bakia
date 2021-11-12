import useLocalStorage from "@/lib/hooks/useLocalStorage";
import { CartItem as CartItemType } from "@/lib/types/cart";
import { Discount } from "@/lib/types/discount";
import ItemCard from "./ItemCard";

interface CartProps {
  discount: Discount;
}

interface CartItemProps {
  cartItem: CartItemType;
  discount: Discount;
}

const CartItem = ({ cartItem, discount }: CartItemProps) => {
  return (
    <div>
      <ItemCard
        item={cartItem}
        isDiscountValid={discount.code === cartItem.discountCode}
        onChangeDiscountCode={() => {}}
        onChangeQuantity={() => {}}
      />
    </div>
  );
};

const Cart = ({ discount }: CartProps) => {
  const [cart, setCart] = useLocalStorage<CartItemType[]>("cart", []);
  return (
    <>
      <div>
        {cart.length && (
          <ul>
            {cart.map((cartItem) => (
              <li key={cartItem.id}>
                <CartItem cartItem={cartItem} discount={discount} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default Cart;
