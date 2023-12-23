'use client';

import { Footer } from 'flowbite-react';

const FooterComponent = () => {
    return (
        <div id="component_FooterComponent">
            <hr className='mt-20' />
            <Footer container className='shadow-none mt-5'>
                <Footer.Copyright href="#" by="NoneOrg™" year={2023} />
            </Footer>
        </div>
    );
}

export default FooterComponent;