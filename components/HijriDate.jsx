import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import axios from "axios";

const HijriDate = ({ gregorianDate, style, errorStyle }) => {
    const [hijriDate, setHijriDate] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchHijriDate = async () => {
            try {
                setLoading(true);
                const date = gregorianDate || "today";
                const response = await axios.get(`http://api.aladhan.com/v1/gToH/${date}`);

                const { hijri } = response.data.data;
                const dateStr = `${hijri.day} ${hijri.month.en}, ${hijri.year} AH`;
                setHijriDate(dateStr);
            } catch (error) {
                setError("Error fetching Hijri date.");
            }
        };

        fetchHijriDate();
    }, [gregorianDate]);
};

export default HijriDate;