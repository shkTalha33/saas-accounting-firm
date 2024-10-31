export const calculateFinalPrice = (
    totalPrice,
    discountPercentage = 0,
    taxPercentage = 0
) => {
    const discountAmount = (totalPrice * discountPercentage) / 100;
    const priceAfterDiscount = totalPrice - discountAmount;
    const taxAmount = (priceAfterDiscount * taxPercentage) / 100;
    const finalPrice = priceAfterDiscount + taxAmount;
    return parseInt(finalPrice.toFixed(2));
};