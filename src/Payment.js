import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import Axios from "./axios";
import React, { useEffect, useState } from "react";
import CurrencyFormat from "react-currency-format";
import { Link , useHistory} from "react-router-dom";
import Checkoutproduct from "./Checkoutproduct";
import "./Payment.css";
import { getBasketTotal } from "./reducer";
import { useStateValue } from "./StateProvider";
import { db } from "./firebase";

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();
    const history = useHistory();
  const [error, setError] = useState(null);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientsecret, setClientsecret] = useState(true);

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
      // generate the special stripe
    //    secret which allows us to charge a customer
    const getClientsecret =async () => {
        const responce = await Axios({
            method:'post',
            // STRIPE xpects the total in a currencies submits
            url : `/payments/create?total=${getBasketTotal(basket)*100}`
        }) // axios is like posting a request  
        setClientsecret(responce.data.clientsecret)

    }
    getClientsecret();
  }, [basket])

  console.log("the secret is >>>>>>", clientsecret)
  const handleSubmit = async e => {
    // do all the fancy stripe things
    e.preventDefault();//prevent from refreshing
    setProcessing(true);
    const payload= await stripe.confirmCardPayment(clientsecret,{
        payment_method:{card:elements.getElement(CardElement)}})
        .then(({paymentIntent}) => {
            //paymentIntent = payment confirmation
            
            db.collection('users')
            .doc(user?.uid)
            .collection('orders')
            .doc(paymentIntent.id)
            .set({
                basket:basket,
                amount: paymentIntent.amount,
                created:paymentIntent.created,
            })
            
            setSucceeded(true);
            setError(null);
            setProcessing(false);

            dispatch({
                type:'EMPTY_BASKET'
            })
            history.replace('/orders');
        })

  };

  const handleChange = (e) => {
    // LISTEN FOR CHANGES IN THE CARD ELEMENT
    // AND Display any errors as the customer types their card details
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };

  return (
    <div className="payment">
      <div className="payment_container">
        {/* Payment Section - delivery address */}
        <h1>
          {" "}
          Checkout (<Link to="/checkout">{basket?.length} items</Link>)
        </h1>
        <div className="payment_section">
          <div className="payment_title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment_address">
            <p>{user?.email}</p>
            <p>123 React Lane</p>
            <p>Los Angeles , CA</p>
          </div>
        </div>

        {/* Payment Section - Review Items*/}

        <div className="payment_section">
          <div className="payment_title">
            <h3>Review Items and delivery</h3>
          </div>
          <div className="payment_items">
            {basket.map((item) => (
              <Checkoutproduct
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>

        {/* Payment Section - PAyment Method */}

        <div className="payment_section">
          <div className="payment_title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment_details">
            {/* stripe magic */}
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />

              <div className="payment_priceContainer">
                <CurrencyFormat
                  renderText={(value) => <h3>Order Total : {value}</h3>}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy now "}</span>
                </button>
              </div>
              {/* FOR ERROR */}
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Payment;
