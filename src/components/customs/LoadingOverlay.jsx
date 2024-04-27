import { CircularProgress } from "@mui/material";

const LoadingOverlay = () => {
    return (
        <div className="flex flex-col opacity-90 justify-center items-center h-full w-full bg-white absolute top-0 left-0 bottom-0 right-0">
            <CircularProgress color="error" />
        </div>
    )
}

export default LoadingOverlay;