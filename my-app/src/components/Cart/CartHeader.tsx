import React from "react";
import "./CartHeader.css";

function CartHeader() {
  return (
    <div className="row cart-row-header g-0 mb-4">
      <label className="col-sm-2"></label>
      <label className="col-sm-3"></label>
      <label className="col-sm-2"></label>
      <label className="col-sm-3">Quantity</label>
      <label className="book-removal"></label>
      <label className="col-sm-2">Total</label>
    </div>
  );
}

export default CartHeader;
