"use client";

import { TrashBin } from "@gravity-ui/icons";
import { AlertDialog, Button } from "@heroui/react";
import { useRouter } from "next/navigation";

export function DeleteAlert({ pet }) {
    const { _id, petName } = pet;

    const router = useRouter();

    const handleDelete = async () => {
        const res = await fetch(`http://localhost:8000/pets/${_id}`, {
            method: "DELETE",
        });

        const data = await res.json();

        router.push("/all-pets");
    };

    return (
        <AlertDialog>
            <Button className="text-red-500 rounded-none" variant="outline">
                <TrashBin /> Delete
            </Button>

            <AlertDialog.Backdrop>
                <AlertDialog.Container>
                    <AlertDialog.Dialog className="sm:max-w-[400px]">

                        <AlertDialog.CloseTrigger />

                        <AlertDialog.Header>
                            <AlertDialog.Icon status="danger" />
                            <AlertDialog.Heading>
                                Delete destination permanently?
                            </AlertDialog.Heading>
                        </AlertDialog.Header>

                        <AlertDialog.Body>
                            <p>
                                This will permanently delete <strong>{petName}</strong>{" "}
                                and all of its data. This action cannot be undone.
                            </p>
                        </AlertDialog.Body>

                        <AlertDialog.Footer>
                            <Button slot="close" variant="tertiary">
                                Cancel
                            </Button>

                            <Button
                                onClick={handleDelete}
                                variant="danger"
                            >
                                Delete
                            </Button>
                        </AlertDialog.Footer>

                    </AlertDialog.Dialog>
                </AlertDialog.Container>
            </AlertDialog.Backdrop>
        </AlertDialog>
    );
}