import React from "react";
import "./Home.css";
import Product from "./Product";

function Home() {
  return (
    <div className="home">
      <div className="home_container">
        <img
          className="home_image"
          src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/October/Fuji_Tallhero_Dash_en_US_1x._CB418727898_.jpg"
          alt="image"/>


        <div className="home_row">
          {/* product */}
          <Product
            id="4414342"
            title="The Lean Startup: How Today's Entrepreneurs Use Continuous Innovation to Create Radically Successful Businesses"
            image="https://m.media-amazon.com/images/I/81-QB7nDh4L._AC_UY218_.jpg"
            price={19.99}
            rating={5}
          />    
          <Product
            id="435352"
            title="DISO True Wireless Earbuds Bluetooth 5.0 Headphones Auto Pairing Smart Touch Control Deep Bass IPX5 Waterproof Total 20H Playtime with Charging Case for Sport (Gray)"
            image="https://images-na.ssl-images-amazon.com/images/I/61uHKmhmdlL._AC_SX679_.jpg"
            price={35.99}
            rating={4}
          />
        </div>
        
        <div className="home_row">
        <Product
            id="445392"
            title="PlayStation 5 Console"
            image="https://images-na.ssl-images-amazon.com/images/I/619BkvKW35L._SL1500_.jpg"
            price={3005.99}
            rating={4}
          />
          
          <Product
            id="8948847"
            title="Made in Germany GM-112-2 Madrid Theorema Automatic Watch"
            image="https://images-na.ssl-images-amazon.com/images/I/71igAI6SF2L._AC_UY741_.jpg"
            price={31005.99}
            rating={3}
          />
          <Product
            id="784454"
            title="MOERDENG Men's Waterproof Ski Jacket Warm Winter Snow Coat Mountain Windbreaker Hooded Raincoat Snowboarding Jackets"
            image="https://images-na.ssl-images-amazon.com/images/I/61uibwqiLyL._AC_UY550_.jpg"
            price={145.89}
            rating={4}
          />
        </div>
        <div className="home_row">
        <Product
            id="8524545"
            title="SAMSUNG QN32Q50RAFXZA Flat 32 QLED 4K 32Q50 Series Smart TV"
            image="https://images-na.ssl-images-amazon.com/images/I/51NKhnjhpGL._AC_SX679_.jpg"
            price={1200.89}
            rating={4}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
