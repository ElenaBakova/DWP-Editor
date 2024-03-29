import React from 'react'

export interface DropZoneProps {
    onDragStateChange?: (isDragActive: boolean) => void
    onDrag?: () => void
    onDragIn?: () => void
    onDragOut?: () => void
    onDrop?: () => void
    onFilesDrop?: (files: File[]) => void
}

// The drop zone
export const DropZone = React.memo(
    (props: React.PropsWithChildren<DropZoneProps>) => {
        const {
            onDragStateChange,
            onFilesDrop,
            onDragIn,
            onDragOut,
            onDrop,
        } = props

        const [isDragActive, setIsDragActive] = React.useState(false)
        const dropZoneRef = React.useRef<null | HTMLDivElement>(null)

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

            let files = event.dataTransfer ? [...event.dataTransfer.files] : [];
            files = files.filter(file => file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
            files = (files === undefined) ? [] : files
            onFilesDrop && onFilesDrop(files)

            event.dataTransfer.clearData()
        }

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
            }

            return () => {
                tempZoneRef?.removeEventListener('dragenter', handleDragEnter)
                tempZoneRef?.removeEventListener('dragleave', handleDragOut)
                tempZoneRef?.removeEventListener('dragover', handleDrag)
                tempZoneRef?.removeEventListener('drop', handleDrop)
            }
        }, [])

        return <div ref={dropZoneRef}>{props.children}</div>
    }
)

DropZone.displayName = 'DropZone'