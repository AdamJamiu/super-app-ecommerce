import DashboardLayout from "../global/DashboardLayout";

const ReturnPolicy = () => {
    return (
        <DashboardLayout>
            <div className="flex flex-col justify-start items-start my-10 max-w-5xl w-full bg-white py-10 px-5 sm:p-10 shadow-sm rounded-md h-full gap-5">
                <h1 className="font-bold w-full text-lg ">Return Policy for Physical Products</h1>

                <p>Thanks for purchasing our products at <a href="https://www.justownitapp.com" className="hover:underline hover:text-primary font-semibold">https://www.justownitapp.com</a> operated by TD Africa Distributions Limited.</p>

                <p>In order to be eligible for a refund, you have to return the product within 7 calendar days of your purchase. The product must be in the same condition that you receive it and undamaged in any way.</p>

                <p>Kindly note that this will be in line with the manufacturers (OEM) prescribed process for receiving and evaluating and actioning.</p>

                <p>After we receive your item, our team of professionals will inspect it and process according to OEM prescribed process. In the case of a replacement or refund, the money will be refunded to the customer's prescribed account. Payments may take 5 to 10 business days for a refund to show up on your account statement.</p>

                <p>For replacement, this will be defined by the OEM within its prescribed timelines for cases considered as DOA.</p>

                <p>If the product is damaged in any way, or you have initiated the return after 7 calendar days have passed, you will not be eligible for a replacement or refund.</p>

                <p>Also note that all products come with defined OEM warranties, and products outside the warranty period will not get OEM first-level service as defined.</p>

                <h2 className="font-bold">Reasons for Return Acceptable</h2>
                <ul className="list-disc pl-12">
                    <li>Items are faulty at purchase without any additional damage (i.e., factory faults) (To be checked and confirmed) according to OEM defined processes.</li>
                    <li>Described item is not what was delivered (We will confirm the details of the order placed).</li>
                    <li>Item looks used or seal broken.</li>
                </ul>

                <p>If anything is unclear or you have more questions, feel free to contact our customer support team at <a href="mailto:info@justownitapp.com" className="font-semibold text-primary hover:underline">info@justownitapp.com</a>.</p>
            </div >
        </DashboardLayout >
    )
}

export default ReturnPolicy;
