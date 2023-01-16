import axios from "axios";

export default function PayButton(){

    const handleCheckout = () => {
        axios.post(`http://localhost:5000/create-checkout-session`);
    }

    return(
        <div>
            <button onClick={() => handleCheckout()}>Checkout</button>
            
        </div>
    )
}