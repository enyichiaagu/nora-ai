import { useState, ReactNode } from "react";
import { Copy, CircleCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface TooltipProps {
	children: ReactNode;
	content: ReactNode;
	open: boolean;
}

const Tooltip: React.FC<TooltipProps> = ({ children, content, open }) => {
	return (
		<div className='relative inline-block'>
			{children}
			{open && (
				<div className='absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-3 py-2 bg-white rounded shadow-md border border-gray-200 text-gray-700 text-sm whitespace-nowrap z-50'>
					{content}
					<div className='absolute -bottom-2 left-1/2 -translate-x-1/2 border-8 border-transparent border-t-white'></div>
				</div>
			)}
		</div>
	);
};

// CopyButton component types
interface CopyButtonProps {
	textToCopy: string;
	buttonStyle?: string;
	iconStyle?: string;
}

// CopyButton component with tooltip and types
const CopyButton: React.FC<CopyButtonProps> = ({
	textToCopy,
	buttonStyle,
	iconStyle,
}) => {
	const [copied, setCopied] = useState<boolean>(false);
	const [showTooltip, setShowTooltip] = useState<boolean>(false);

	const handleCopy = (): void => {
		navigator.clipboard.writeText(textToCopy);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<Tooltip
			content={copied ? "Copied!" : "Copy to clipboard"}
			open={showTooltip}>
			<button
				className={cn(
					" text-gray-200 hover:text-gray-400 transition-colors duration-200",
					buttonStyle
				)}
				onClick={handleCopy}
				onMouseEnter={() => setShowTooltip(true)}
				onMouseLeave={() => setShowTooltip(false)}>
				{copied ? (
					<CircleCheck
						className={cn("w-4 h-4 text-gray-300", iconStyle)}
					/>
				) : (
					<Copy className={cn("h-4 w-4", iconStyle)} />
				)}
			</button>
		</Tooltip>
	);
};

export default CopyButton;
