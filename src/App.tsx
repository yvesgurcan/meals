import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

enum DaysOfTheWeek {
    monday = 'monday',
    tuesday = 'tuesday',
    wednesday = 'wednesday',
    thursday = 'thursday',
    friday = 'friday',
    saturday = 'saturday',
    sunday = 'sunday',
}

interface Meals {
    breakfast: string[];
    snack1: string[];
    lunch: string[];
    snack2: string[];
    dinner: string[];
    snack3: string[];
}

interface MealPlan {
    [DaysOfTheWeek.monday]: Meals;
    [DaysOfTheWeek.tuesday]: Meals;
    [DaysOfTheWeek.wednesday]: Meals;
    [DaysOfTheWeek.thursday]: Meals;
    [DaysOfTheWeek.friday]: Meals;
    [DaysOfTheWeek.saturday]: Meals;
    [DaysOfTheWeek.sunday]: Meals;
}

const LOCAL_STORAGE_PROPERTY = 'mealplan';

const MEAL_PLAN_BUILDER = [
    {
        name: 'Monday',
        property: DaysOfTheWeek.monday,
    },
    {
        name: 'Tuesday',
        property: DaysOfTheWeek.tuesday,
    },
    {
        name: 'Wednesday',
        property: DaysOfTheWeek.wednesday,
    },
    {
        name: 'Thursday',
        property: DaysOfTheWeek.thursday,
    },
    {
        name: 'Friday',
        property: DaysOfTheWeek.friday,
    },
    {
        name: 'Saturday',
        property: DaysOfTheWeek.saturday,
    },
    {
        name: 'Sunday',
        property: DaysOfTheWeek.sunday,
    },
];

const MEAL_NAMES = {
    breakfast: 'Breakfast',
    snack1: 'Snack',
    lunch: 'Lunch',
    snack2: 'Snack',
    dinner: 'Dinner',
    snack3: 'Snack',
};

const Days = styled.div`
    box-sizing: border-box;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 5rem;
    width: 100vw;

    @media (max-width: 1000px) {
        grid-template-columns: 1fr 1fr;
    }

    @media (max-width: 700px) {
        grid-template-columns: 1fr;
    }
`;

const Day = styled.div`
    box-sizing: border-box;
    min-height: 40vh;
    min-width: 50%;
    padding: 1rem;
`;

const MealTitle = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const List = styled.ul`
    padding: 0;
`;

const ListItem = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    min-height: 2.5rem;
    margin-bottom: 0.5rem;
`;

const DeleteItemButton = styled.button`
    background-color: tomato;
    padding: 5px 10px;
    cursor: pointer;
`;

const AddItemButton = styled.button`
    background-color: limegreen;
    padding: 5px 10px;
`;

const ExportImportContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    padding-top: 1rem;
    padding-right: 1rem;
`;

const ExportButton = styled.button`
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 5px 10px;
`;

const ImportButton = styled.button`
    background-color: rgb(218, 27, 228);
    color: #fff;
    border: none;
    padding: 5px 10px;
    margin-left: 0.75rem;
    cursor: pointer;
`;

function formatTimestamp(date: Date): string {
    const year = date.getFullYear().toString().padStart(4, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${year}-${month}-${day}-${hours}-${minutes}-${seconds}`;
}

const App: React.FC = () => {
    const [mealPlan, setMealPlan] = useState<MealPlan>({
        monday: {
            breakfast: [],
            snack1: [],
            lunch: [],
            snack2: [],
            dinner: [],
            snack3: [],
        },
        tuesday: {
            breakfast: [],
            snack1: [],
            lunch: [],
            snack2: [],
            dinner: [],
            snack3: [],
        },
        wednesday: {
            breakfast: [],
            snack1: [],
            lunch: [],
            snack2: [],
            dinner: [],
            snack3: [],
        },
        thursday: {
            breakfast: [],
            snack1: [],
            lunch: [],
            snack2: [],
            dinner: [],
            snack3: [],
        },
        friday: {
            breakfast: [],
            snack1: [],
            lunch: [],
            snack2: [],
            dinner: [],
            snack3: [],
        },
        saturday: {
            breakfast: [],
            snack1: [],
            lunch: [],
            snack2: [],
            dinner: [],
            snack3: [],
        },
        sunday: {
            breakfast: [],
            snack1: [],
            lunch: [],
            snack2: [],
            dinner: [],
            snack3: [],
        },
    });

    const [updateLocalStorage, setUpdateLocalStorage] = useState(false);

    useEffect(() => {
        const savedMealPlan = localStorage.getItem(LOCAL_STORAGE_PROPERTY);
        if (savedMealPlan) {
            setMealPlan(JSON.parse(savedMealPlan));
        }
    }, []);

    useEffect(() => {
        if (updateLocalStorage) {
            localStorage.setItem(
                LOCAL_STORAGE_PROPERTY,
                JSON.stringify(mealPlan)
            );
            setUpdateLocalStorage(false);
        }
    }, [mealPlan]);

    const handleAddItem = (day: keyof MealPlan, meal: keyof Meals) => {
        const newItem = prompt('Enter a new item:');
        if (newItem) {
            setMealPlan((prevMealPlan) => ({
                ...prevMealPlan,
                [day]: {
                    ...prevMealPlan[day],
                    [meal]: [...prevMealPlan[day][meal], newItem],
                },
            }));
            setUpdateLocalStorage(true);
        }
    };

    const handleDeleteItem = (
        day: keyof MealPlan,
        meal: keyof Meals,
        index: number
    ) => {
        setMealPlan((prevMealPlan) => {
            const updatedMealPlanDayMeal = prevMealPlan[day][meal].filter(
                (_, i) => i !== index
            );
            return {
                ...prevMealPlan,
                [day]: {
                    ...prevMealPlan[day],
                    [meal]: updatedMealPlanDayMeal,
                },
            };
        });
        setUpdateLocalStorage(true);
    };

    const handleExportData = () => {
        const dataToExport = localStorage.getItem(LOCAL_STORAGE_PROPERTY);
        if (dataToExport) {
            const element = document.createElement('a');
            element.setAttribute(
                'href',
                'data:text/plain;charset=utf-8,' +
                    encodeURIComponent(dataToExport)
            );
            element.setAttribute(
                'download',
                `${LOCAL_STORAGE_PROPERTY}_${formatTimestamp(new Date())}.json`
            );
            element.style.display = 'none';
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
        }
    };

    const handleImportData = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const importedData = event.target?.result as string;
                setMealPlan(JSON.parse(importedData));
            };
            reader.readAsText(file);
        }
    };

    return (
        <>
            <ExportImportContainer>
                <ExportButton onClick={handleExportData}>Export</ExportButton>
                <div>
                    <ImportButton>
                        <label htmlFor="import">Import</label>
                    </ImportButton>
                    <input
                        id="import"
                        name="import"
                        type="file"
                        accept=".json"
                        onChange={handleImportData}
                        style={{ display: 'none', visibility: 'hidden' }}
                    />
                </div>
            </ExportImportContainer>
            <Days>
                {MEAL_PLAN_BUILDER.map((day) => (
                    <Day key={day.name}>
                        <h2>{day.name}</h2>
                        <List>
                            {Object.keys(mealPlan[day.property]).map(
                                (mN, mealIndex) => {
                                    const mealName = mN as keyof Meals;
                                    // @ts-expect-error
                                    const displayedMealName = MEAL_NAMES[mN];
                                    return (
                                        <div key={mealIndex}>
                                            <MealTitle>
                                                <h3>{displayedMealName}</h3>
                                                <AddItemButton
                                                    onClick={() =>
                                                        handleAddItem(
                                                            day.property,
                                                            mealName
                                                        )
                                                    }
                                                >
                                                    ➕
                                                </AddItemButton>
                                            </MealTitle>
                                            {mealPlan[day.property][
                                                mealName
                                            ].map((item, index) => (
                                                <ListItem
                                                    key={`${item}-${index}`}
                                                >
                                                    {item}{' '}
                                                    <DeleteItemButton
                                                        onClick={() =>
                                                            handleDeleteItem(
                                                                day.property,
                                                                mealName,
                                                                index
                                                            )
                                                        }
                                                    >
                                                        ➖
                                                    </DeleteItemButton>
                                                </ListItem>
                                            ))}
                                        </div>
                                    );
                                }
                            )}
                        </List>
                    </Day>
                ))}
            </Days>
        </>
    );
};

export default App;
