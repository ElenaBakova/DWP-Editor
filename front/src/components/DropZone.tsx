import React from 'react'

export interface DropZoneProps {
    onDragStateChange?: (isDragActive: boolean) => void
    onDrag?: () => void
    onDragIn?: () => void
    onDragOut?: () => void
    onDrop?: () => void
    onFilesDrop?: (files: File[]) => void
    onClick?: () => void
}

// The drop zone
export const DropZone = React.memo(
    (props: React.PropsWithChildren<DropZoneProps>) => {
        const {
            onDragStateChange,
            onFilesDrop,
            onDrag,
            onDragIn,
            onDragOut,
            onDrop,
        } = props

        const [isDragActive, setIsDragActive] = React.useState(false)
        const dropZoneRef = React.useRef<null | HTMLDivElement>(null)
        const fileRef = React.useRef();

        const handleDragEnter = (event: any) => {
            event.preventDefault()
            event.stopPropagation()
            onDragIn?.()

            if (event.dataTransfer.items && event.dataTransfer.items.length > 0) {
                setIsDragActive(true)
            }
        }

        const handleDragOut = (event: DragEvent) => {
            event.preventDefault()
            event.stopPropagation()
            onDragOut?.()

            setIsDragActive(false)
        }

        const handleDrag = (event: any) => {
            event.preventDefault()
            event.stopPropagation()
        }

        const handleDrop = (event: any) => {
            event.preventDefault()
            event.stopPropagation()

            setIsDragActive(false)
            onDrop?.()

            const files = event.dataTransfer ? [...event.dataTransfer.files] : [];
            onFilesDrop && onFilesDrop(files)

            event.dataTransfer.clearData()
        }

        // нужно добавить открывающееся окно с выбором файлов
        const handleClick = (e: any) => {
            console.log('click')
        };

        React.useEffect(() => {
            onDragStateChange?.(isDragActive)
        }, [isDragActive])

        React.useEffect(() => {
            const tempZoneRef = dropZoneRef?.current
            if (tempZoneRef) {
                tempZoneRef.addEventListener('dragenter', handleDragEnter)
                tempZoneRef.addEventListener('dragleave', handleDragOut)
                tempZoneRef.addEventListener('dragover', handleDrag)
                tempZoneRef.addEventListener('drop', handleDrop)
                tempZoneRef.addEventListener('click', handleClick)
            }

            return () => {
                tempZoneRef?.removeEventListener('dragenter', handleDragEnter)
                tempZoneRef?.removeEventListener('dragleave', handleDragOut)
                tempZoneRef?.removeEventListener('dragover', handleDrag)
                tempZoneRef?.removeEventListener('drop', handleDrop)
                tempZoneRef?.removeEventListener('click', handleClick)
            }
        }, [])

        return <div ref={dropZoneRef}>{props.children}</div>
    }
)

DropZone.displayName = 'DropZone'