import styles from "./openButton.module.css";

interface OpenTableButtonProps {
    disabled?: boolean;
}

export default function OpenTableButton({ disabled  }: OpenTableButtonProps) {
    return (
        <>
            <button onClick={()=> alert("si jala")} disabled={disabled} className={styles.openTableButton}>
                Open Table
            </button>
            <button disabled={disabled} className={styles.opTable}>
                A
            </button>
        </>
       
    );
}