// import React from 'react';

// const SvgImage = ({ data }) => {
//     return (
//         <div className="relative bg-white rounded-lg shadow-md p-2">
//             <img
//                 src="/images/Picture1.svg"
//                 alt="Machine Diagram"
//                 className="w-full h-auto"
//             />
//         </div>
//     );
// };

// export default SvgImage;



import React, { useEffect, useState } from 'react';

const SvgImage = ({ data }) => {
    const [svgContent, setSvgContent] = useState('');

    useEffect(() => {
        const loadSvg = async () => {
            try {
                const response = await fetch('/images/Picture1.svg');
                const svgText = await response.text();

                // Get the last value from data array
                const lastValue = data[data.length - 1]?.value || 0;

                // Create a DOM parser
                const parser = new DOMParser();
                const doc = parser.parseFromString(svgText, 'image/svg+xml');

                // Find the element with id="pres-1"
                const presElement = doc.getElementById('pres-1');
                if (presElement) {
                    // Update the text content with the formatted value
                    presElement.textContent = lastValue.toFixed(2);
                }

                // Convert back to string
                const serializer = new XMLSerializer();
                const modifiedSvg = serializer.serializeToString(doc);

                setSvgContent(modifiedSvg);
            } catch (error) {
                console.error('Error loading SVG:', error);
            }
        };

        if (data && data.length > 0) {
            loadSvg();
        }
    }, [data]);

    return (
        <div className="relative flex justify-center items-center p-2">
            {svgContent ? (
                <div dangerouslySetInnerHTML={{ __html: svgContent }} className='w-full h-auto' />
            ) : (
                <div className="flex items-center justify-center">
                    Loading...
                </div>
            )}
        </div>
    );
};

export default SvgImage;