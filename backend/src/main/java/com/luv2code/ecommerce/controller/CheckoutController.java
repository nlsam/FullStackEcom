package com.luv2code.ecommerce.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.luv2code.ecommerce.dto.PaymentInfo;
import com.luv2code.ecommerce.dto.Purchase;
import com.luv2code.ecommerce.dto.PurchaseResponse;
import com.luv2code.ecommerce.service.CheckoutService;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;

@RestController
@RequestMapping("/api/checkout")
public class CheckoutController {

    private Logger logger =LoggerFactory.getLogger(getClass().getName());
	
	private CheckoutService checkoutService;

    public CheckoutController(CheckoutService checkoutService) {
        this.checkoutService = checkoutService;
    }

    @PostMapping("/purchase")
    public PurchaseResponse placeOrder(@RequestBody Purchase purchase) {
        logger.info("Currently processing the purchase");
        PurchaseResponse purchaseResponse = checkoutService.placeOrder(purchase);
        logger.info("Order Successful");
        logger.info("Order number is  " + purchaseResponse.getOrderTrackingNumber());
        return purchaseResponse;
        
    }
    
    @PostMapping("/payment-intent")
    public ResponseEntity<String> createPaymentIntent(@RequestBody PaymentInfo paymentInfo) throws StripeException{
    	logger.info("The payment amount is " +paymentInfo.getAmount());
    	PaymentIntent paymentIntent=checkoutService.createPaymentIntent(paymentInfo);
    	String paymentStr=paymentIntent.toJson();
    	logger.info("Payment complete.");
    	return new ResponseEntity<>(paymentStr, HttpStatus.OK);
    	
    	
    }

}

