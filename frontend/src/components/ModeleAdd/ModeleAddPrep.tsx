import { useState, useEffect, useRef } from 'react';
import { SelectItem } from '../Actif/type';
import { Formik, FormikErrors, FormikValues } from 'formik';
import ModeleFormAdd from './ModeleFormAdd';
import FormLayout from '../FormLayout';
import { toast } from 'react-toastify';

//import { useNavigate } from 'react-router-dom';

const ModeleAddPrep = () => {
    const [categories, setCategories] = useState<SelectItem[]>([]);
    const formValuesRef = useRef<FormikValues | null>(null);
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleUpdate = (values: FormikValues) => {
        formValuesRef.current = values;
        handleOpen();
    };

    const initialValues = {
        nom: '',
        id_type_modele: '',
        stockage: '',
        processeur: '',
        memoire_vive: '',
        taille: '',
        favoris: false,
    };

    useEffect(() => {
        fetch(window.name + 'api/categories/light')
            .then((response) => response.json())
            .then((fetchedCategories) => {
                setCategories(
                    fetchedCategories.map((statut: any) => ({
                        id: statut.id,
                        label: statut.nom,
                    }))
                );
            });
    }, []);

    const handleSubmit = () => {
        const values = formValuesRef.current;
        if (!values) return;


        const id_user = localStorage.getItem('id_user') || 'unknown';
        const updatedData = {
            nom: values.nom,
            id_type_modele: values.id_type_modele?.id || values.id_type_modele,
            stockage: values.stockage,
            processeur: values.processeur,
            memoire_vive: values.memoire_vive,
            taille: values.taille,
            favoris: values.favoris ? 1 : 0,
        };
        fetch(window.name + 'api/modele', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-User-Action-Id': id_user,
            },
            body: JSON.stringify(updatedData),
        })
            .then((response) => {
                if (response.ok) {
                    toast.success('Données sauvegardées avec succès');
                    handleClose(); // Close the form after successful submission

                } else {
                    toast.error('Une erreur est survenue');

                }
            })
            .catch(() => {
                toast.error('Une erreur est survenue');
            });
    };

    const reloadData = () => {
        setTimeout(() => {
            fetch(window.name + 'api/categories/light')
                .then((response) => response.json())
                .then((data) => {
                    setCategories(
                        data.map((statut: any) => ({
                            id: statut.id,
                            label: statut.nom,
                        }))
                    );
                });
        }, 1000);
    };

    const validate = (values: FormikValues) => {
        const errors: FormikErrors<FormikValues> = {};

        if (values.nom.length > 32)
            errors.nom = 'Le nom ne doit pas dépasser 32 caractères';
        else if (!values.nom) errors.nom = 'Requis';
        if (!values.id_type_modele) {
            errors.id_type_modele = 'Requis';
        }

        return errors;
    };

    return (
        <div className="mx-auto mt-8">
            <Formik
                initialValues={initialValues}
                onSubmit={handleUpdate}
                validate={validate}
            >
                {({ values, dirty, setFieldValue, errors }) => (

                    <FormLayout
                        title={'Nouveau Modele'}
                        dirty={dirty}
                        handleConfirm={handleSubmit}
                        open={open}
                        handleClose={handleClose}>
                        <ModeleFormAdd
                            categories={categories}
                            values={values}
                            dirty={dirty}
                            setFieldValue={setFieldValue}
                            reloadData={reloadData}
                            errors={errors}
                            onFormSubmit={handleUpdate}
                        />
                    </FormLayout>
                )}

            </Formik>
        </div>
    );
};

export default ModeleAddPrep;
