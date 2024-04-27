import DashboardLayout from "../global/DashboardLayout";
import pdfLink from "../assets/JOI_PRIME_CUSTOMER_JOURNEY.pdf"

const OurStory = () => {
    return (
        <DashboardLayout>
            <div className="flex flex-col justify-start items-start my-10 max-w-5xl w-full bg-white py-10 px-5 sm:p-10 shadow-sm rounded-md h-full gap-5">
                <h1 className="font-bold w-full  text-lg">Our Story</h1>

                <p>
                    Just Own It is a first of its kind multi asset-financing platform that bridges the gap
                    between financial institutions, customers and Original Equipment Manufacturers
                    (OEMs).
                </p>

                <p>
                    In line with our mission to ensure products and services are accessible, affordable and
                    usable across Africa, we have built a digital product warehouse combined with lending
                    gateways.
                </p>

                <p>This comes from years of experience in the product ecosystems and strong
                    relationships that extends from manufacturers to technology experts as well as financial.
                </p>

                <p>This technology solution is built to ensure a stable supply of assets with minimal hassles
                    in order to ease your journey to acquisition.
                </p>

                <div className="mt-10 flex flex-col gap-5">
                    <h1 className="font-bold w-full  text-lg">JOI Prime</h1>
                    <p>TD Africa, with its years of experience and strategic partnerships, has developed an
                        asset loaning scheme called Just Own It (JOI) Prime. JOI prime is a BNPL offering that
                        provides institutions and their staff members, a way to purchase our wide variety of
                        products and pay in installments.
                    </p>

                    <p>JOI Prime is a BNPL corporate offering from our JOI platform tailored at corporate
                        entities.
                    </p>

                    <p>The portal offers staff member of our partner corporate the opportunity to acquire
                        desired assets from our JOI platform and spread payments within a defined period of
                        time.
                    </p>

                    <p>
                        Asset value eligibility is determined by the Admin of these entities, the eligibility is what
                        qualifies each staff the opportunity to access the products offered
                    </p>

                </div>

                <div className="mt-10 flex flex-col gap-5">
                    <h1 className="font-bold w-full  text-lg">Staff Journey</h1>
                    <p>Staff have to be registered on our JOI platform using their official email address.</p>
                    <p>For Staff to enjoy the JOI corporate option, they must have been profiled for eligibility
                        spend by their HR/Admin.
                    </p>

                    <p>The Staff official email address is key to processing their transaction.</p>

                    <p>The staff must have available their ATM card tied to their salary account preferably, for
                        initial deposit, this card will be tokenized for subsequent re –payment deductions.
                    </p>

                    <p>For more detail kindly refer to our process manual below</p>

                    <a className="hover:underline w-fit hover:text-primary font-semibold" href={pdfLink} target="_blank">JOI Prime PDF</a>
                </div>

            </div>
        </DashboardLayout>
    )
}

export default OurStory;