"use client";

import {
    Button,
    FieldError,
    Input,
    Label,
    Modal,
    Surface,
    TextArea,
    TextField,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import { BiEdit } from "react-icons/bi";

export function EditModal({ pet }) {

    const router = useRouter();
    const {
        _id,
        image,
        petName,
        age,
        gender,
        description,
        species,
        adoptionFee,
    } = pet;

    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const petData = Object.fromEntries(formData.entries());

        const res = await fetch(`http://localhost:8000/pets/${_id}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(petData),
        });

        const data = await res.json();


        router.push("/all-pets");
    };

    return (
        <Modal>
            <Button variant="outline" className="rounded-none">
                <BiEdit /> Edit
            </Button>

            <Modal.Backdrop>
                <Modal.Container placement="auto">
                    <Modal.Dialog className="sm:max-w-xl">

                        <Modal.CloseTrigger />

                        <Modal.Header>
                            <Modal.Heading>Edit Pet</Modal.Heading>
                        </Modal.Header>

                        <Modal.Body className="p-6">
                            <Surface variant="default">

                                <form onSubmit={onSubmit} className="p-10 space-y-8">

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                                        {/* Pet Name */}
                                        <div className="md:col-span-2">
                                            <TextField defaultValue={petName} name="petName" isRequired>
                                                <Label>Pet Name</Label>
                                                <Input className="rounded-2xl" />
                                            </TextField>
                                        </div>

                                        {/* Species */}
                                        <TextField defaultValue={species} name="Species" isRequired>
                                            <Label>Species</Label>
                                            <Input className="rounded-2xl" />
                                        </TextField>

                                        {/* Gender */}
                                        <TextField defaultValue={gender} name="gender" isRequired>
                                            <Label>Gender</Label>
                                            <Input className="rounded-2xl" />
                                        </TextField>

                                        {/* Price (adoptionFee) */}
                                        <TextField defaultValue={adoptionFee} name="adoptionFee" type="number" isRequired>
                                            <Label>Adoption Fee</Label>
                                            <Input type="number" className="rounded-2xl" />
                                        </TextField>

                                        {/* Age */}
                                        <TextField defaultValue={age} name="age" isRequired>
                                            <Label>Age</Label>
                                            <Input className="rounded-2xl" />
                                        </TextField>

                                        {/* Image */}
                                        <div className="md:col-span-2">
                                            <TextField defaultValue={image} name="image" isRequired>
                                                <Label>Image URL</Label>
                                                <Input className="rounded-2xl" />
                                            </TextField>
                                        </div>

                                        {/* Description */}
                                        <div className="md:col-span-2">
                                            <TextField defaultValue={description} name="description" isRequired>
                                                <Label>Description</Label>
                                                <TextArea className="rounded-3xl" />
                                            </TextField>
                                        </div>

                                    </div>

                                    {/* Buttons FIXED */}
                                    <Modal.Footer>
                                        <Button type="submit">
                                            Save
                                        </Button>
                                    </Modal.Footer>

                                </form>

                            </Surface>
                        </Modal.Body>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}