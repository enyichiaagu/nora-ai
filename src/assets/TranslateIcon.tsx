import React from "react";

interface TranslateIconProps {
	/** Size of the icon (width and height) */
	size?: number | string;
	/** Stroke color */
	color?: string;
	/** Stroke width */
	strokeWidth?: number | string;
	/** Custom className */
	className?: string;
	/** Custom styles */
	style?: React.CSSProperties;
	/** Click handler */
	onClick?: () => void;
}

const TranslateIcon: React.FC<TranslateIconProps> = ({
	size = 24,
	color = "#292D32",
	strokeWidth = 1.5,
	className = "",
	style = {},
	onClick,
}) => {
	return (
		<svg
			viewBox='0 0 24 24'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			width={size}
			height={size}
			className={className}
			style={style}
			onClick={onClick}
			role={onClick ? "button" : "img"}
			aria-label='Translate icon'>
			<g>
				{/* Letter A in circle */}
				<path
					d='M19.06 18.6699L16.92 14.3999L14.78 18.6699'
					stroke={color}
					strokeWidth={strokeWidth}
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
				<path
					d='M15.1699 17.9099H18.6899'
					stroke={color}
					strokeWidth={strokeWidth}
					strokeLinecap='round'
					strokeLinejoin='round'
				/>

				{/* Circle */}
				<path
					d='M16.9201 22.0001C14.1201 22.0001 11.8401 19.73 11.8401 16.92C11.8401 14.12 14.1101 11.8401 16.9201 11.8401C19.7201 11.8401 22.0001 14.11 22.0001 16.92C22.0001 19.73 19.7301 22.0001 16.9201 22.0001Z'
					stroke={color}
					strokeWidth={strokeWidth}
					strokeLinecap='round'
					strokeLinejoin='round'
				/>

				{/* Document/Text area */}
				<path
					d='M5.02 2H8.94C11.01 2 12.01 3.00002 11.96 5.02002V8.94C12.01 11.01 11.01 12.01 8.94 11.96H5.02C3 12 2 11 2 8.92999V5.01001C2 3.00001 3 2 5.02 2Z'
					stroke={color}
					strokeWidth={strokeWidth}
					strokeLinecap='round'
					strokeLinejoin='round'
				/>

				{/* Text/Language elements */}
				<path
					d='M9.00995 5.84985H4.94995'
					stroke={color}
					strokeWidth={strokeWidth}
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
				<path
					d='M6.96997 5.16992V5.84991'
					stroke={color}
					strokeWidth={strokeWidth}
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
				<path
					d='M7.98994 5.83984C7.98994 7.58984 6.61994 9.00983 4.93994 9.00983'
					stroke={color}
					strokeWidth={strokeWidth}
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
				<path
					d='M9.0099 9.01001C8.2799 9.01001 7.61991 8.62 7.15991 8'
					stroke={color}
					strokeWidth={strokeWidth}
					strokeLinecap='round'
					strokeLinejoin='round'
				/>

				{/* Translation/conversion arrows */}
				<path
					d='M2 15C2 18.87 5.13 22 9 22L7.95 20.25'
					stroke={color}
					strokeWidth={strokeWidth}
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
				<path
					d='M22 9C22 5.13 18.87 2 15 2L16.05 3.75'
					stroke={color}
					strokeWidth={strokeWidth}
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
			</g>
		</svg>
	);
};

export default TranslateIcon;
