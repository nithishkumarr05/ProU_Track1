import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import InvoiceGenerator from '@/components/ui/invoice-generator';
import { CreditCard, Phone, Truck, Check, Lock, Shield, CheckCircle } from 'lucide-react';

const EnhancedCheckout = () => {
  const { cartItems } = useSelector((state) => state.shopCart);
  const [currentStep, setCurrentStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [showInvoice, setShowInvoice] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  console.log('EnhancedCheckout rendered, currentStep:', currentStep, 'cartItems:', cartItems);

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Add some products to your cart to proceed with checkout.</p>
            <Button onClick={() => navigate('/shop/listing')} className="bg-teal-600 hover:bg-teal-700">
              Continue Shopping
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const totalCartAmount = cartItems?.reduce((sum, item) => 
    sum + (item.product?.salePrice || item.product?.price || 0) * item.quantity, 0
  ) || 0;
  
  const tax = Math.round(totalCartAmount * 0.18);
  const finalTotal = totalCartAmount + tax;

  const steps = [
    { id: 1, title: 'Cart Review', description: 'Review your items' },
    { id: 2, title: 'Shipping', description: 'Delivery information' },
    { id: 3, title: 'Payment', description: 'Payment method' },
    { id: 4, title: 'Confirmation', description: 'Order complete' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    console.log('handleNext called, currentStep:', currentStep);
    
    if (currentStep === 1) {
      console.log('Step 1: Review order - proceeding to step 2');
    } else if (currentStep === 2) {
      if (!formData.name || !formData.phone || !formData.address || !formData.city || !formData.pincode) {
        toast({
          title: "Please fill in all required fields",
          description: "Name, phone, address, city, and pincode are required.",
          variant: "destructive",
        });
        return;
      }
      console.log('Step 2: Shipping info validated - proceeding to step 3');
    } else if (currentStep === 3) {
      if (paymentMethod === 'card' && (!formData.cardNumber || !formData.expiryDate || !formData.cvv)) {
        toast({
          title: "Please fill in all payment details",
          description: "Card number, expiry date, and CVV are required.",
          variant: "destructive",
        });
        return;
      }
      console.log('Step 3: Payment method validated - proceeding to step 4');
    }
    
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
      console.log('Moving to step:', currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const order = {
      _id: Date.now().toString(),
      userId: 'guest',
      items: cartItems.map(item => ({
        product: item.product,
        quantity: item.quantity,
        price: item.product?.salePrice || item.product?.price || 0
      })),
      totalAmount: finalTotal,
      deliveryAddress: {
        name: formData.name,
        street: formData.address,
        city: formData.city,
        state: 'Tamil Nadu',
        pincode: formData.pincode,
        phone: formData.phone
      },
      status: 'completed',
      paymentMethod: paymentMethod,
      createdAt: new Date().toISOString()
    };

    setCompletedOrder(order);
    setShowInvoice(true);
    setIsProcessing(false);
    
    localStorage.removeItem('cart');
    
    toast({
      title: "Order placed successfully!",
      description: "Your invoice has been generated.",
    });
  };

  const renderStepContent = () => {
    console.log('renderStepContent called, currentStep:', currentStep);
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Review Your Order</h3>
            {cartItems?.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center space-x-4 p-4 border rounded-lg"
              >
                <img
                  src={item.product?.image || '/assets/banner-1.webp'}
                  alt={item.product?.name || 'Product'}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <h4 className="font-medium">{item.product?.name || 'Product'}</h4>
                  <p className="text-sm text-gray-600">{item.product?.category || 'Category'}</p>
                  <p className="text-sm">Qty: {item.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">
                    ₹{((item.product?.salePrice || item.product?.price || 0) * item.quantity).toFixed(2)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Shipping Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="Enter your phone number"
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Enter your email"
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="Enter your address"
                />
              </div>
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  placeholder="Enter your city"
                />
              </div>
              <div>
                <Label htmlFor="pincode">Pincode</Label>
                <Input
                  id="pincode"
                  value={formData.pincode}
                  onChange={(e) => handleInputChange('pincode', e.target.value)}
                  placeholder="Enter pincode"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Payment Method</h3>
            <div className="space-y-2">
              <div 
                className={`flex items-center space-x-2 p-4 border rounded-lg cursor-pointer ${
                  paymentMethod === 'card' ? 'border-teal-500 bg-teal-50' : 'border-gray-200'
                }`}
                onClick={() => setPaymentMethod('card')}
              >
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={() => setPaymentMethod('card')}
                  className="w-4 h-4 text-teal-600"
                />
                <Label className="flex items-center space-x-2 cursor-pointer">
                  <CreditCard className="w-5 h-5" />
                  <span>Credit/Debit Card</span>
                </Label>
              </div>
              <div 
                className={`flex items-center space-x-2 p-4 border rounded-lg cursor-pointer ${
                  paymentMethod === 'upi' ? 'border-teal-500 bg-teal-50' : 'border-gray-200'
                }`}
                onClick={() => setPaymentMethod('upi')}
              >
                <input
                  type="radio"
                  name="payment"
                  value="upi"
                  checked={paymentMethod === 'upi'}
                  onChange={() => setPaymentMethod('upi')}
                  className="w-4 h-4 text-teal-600"
                />
                <Label className="flex items-center space-x-2 cursor-pointer">
                  <Phone className="w-5 h-5" />
                  <span>UPI Payment</span>
                </Label>
              </div>
              <div 
                className={`flex items-center space-x-2 p-4 border rounded-lg cursor-pointer ${
                  paymentMethod === 'cod' ? 'border-teal-500 bg-teal-50' : 'border-gray-200'
                }`}
                onClick={() => setPaymentMethod('cod')}
              >
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                  className="w-4 h-4 text-teal-600"
                />
                <Label className="flex items-center space-x-2 cursor-pointer">
                  <Truck className="w-5 h-5" />
                  <span>Cash on Delivery</span>
                </Label>
              </div>
            </div>

            {paymentMethod === 'card' && (
              <div className="space-y-4 p-4 border rounded-lg">
                <div>
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input
                    id="cardNumber"
                    value={formData.cardNumber}
                    onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                    placeholder="1234 5678 9012 3456"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <Input
                      id="expiryDate"
                      value={formData.expiryDate}
                      onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                      placeholder="MM/YY"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      value={formData.cvv}
                      onChange={(e) => handleInputChange('cvv', e.target.value)}
                      placeholder="123"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Lock className="w-4 h-4" />
              <span>Your payment information is secure and encrypted</span>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="text-center space-y-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <Check className="w-16 h-16 text-green-500 mx-auto mb-4" />
            </motion.div>
            <h3 className="text-2xl font-bold text-green-600">Order Placed Successfully!</h3>
            <p className="text-gray-600">
              Your order has been confirmed and will be delivered soon.
            </p>
            <div className="flex space-x-4 justify-center">
              <Button onClick={() => setShowInvoice(true)} variant="outline">
                View Invoice
              </Button>
              <Button onClick={() => navigate('/shop/home')}>
                Continue Shopping
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (cartItems?.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <Button onClick={() => navigate('/shop/listing')}>
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep >= step.id 
                    ? 'bg-teal-600 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {currentStep > step.id ? <CheckCircle className="w-5 h-5" /> : step.id}
                </div>
                <div className="ml-2 hidden md:block">
                  <p className="font-medium">{step.title}</p>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-1 mx-4 ${
                    currentStep > step.id ? 'bg-teal-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Checkout</CardTitle>
              </CardHeader>
              <CardContent>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {renderStepContent()}
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Buttons */}
                {currentStep < 4 && (
                  <div className="flex justify-between mt-8">
                    <Button
                      onClick={handlePrevious}
                      disabled={currentStep === 1}
                      variant="outline"
                    >
                      Previous
                    </Button>
                    <Button
                      onClick={() => {
                        console.log('Next button clicked, currentStep:', currentStep);
                        if (currentStep === 3) {
                          handlePlaceOrder();
                        } else {
                          handleNext();
                        }
                      }}
                      disabled={isProcessing}
                      className="bg-teal-600 hover:bg-teal-700"
                    >
                      {isProcessing ? 'Processing...' : 
                       currentStep === 3 ? 'Place Order' : 'Next'}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {cartItems?.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span>{item.product?.name || 'Product'} x {item.quantity}</span>
                      <span>₹{((item.product?.salePrice || item.product?.price || 0) * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{totalCartAmount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GST (18%)</span>
                    <span>₹{tax}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>₹{finalTotal}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Shield className="w-4 h-4" />
                  <span>Secure checkout</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Invoice Modal */}
      <InvoiceGenerator
        order={completedOrder}
        isOpen={showInvoice}
        onClose={() => setShowInvoice(false)}
      />
    </div>
  );
};

export default EnhancedCheckout;
