"use client"
import { MoveLeft } from "lucide-react"
import { useEffect } from "react"

export default function Formbutton() {
    useEffect(() => {
        // 1. Cek apakah script sudah ada
        const scriptId = "formspree-button-script"
        if (!document.getElementById(scriptId)) {
            const script = document.createElement("script")
            script.id = scriptId
            script.src = "https://formspree.io/js/formbutton-v1.min.js"
            script.async = true
            document.head.appendChild(script)

            script.onload = () => {
                initForm();
            }
        } else {
            initForm();
        }

        function initForm() {
            const fb = (window as any).formbutton;
            if (fb) {
                /* Paste verbatim sesuai kodemu */
                window.formbutton = window.formbutton || function () { (formbutton.q = formbutton.q || []).push(arguments) };

                formbutton("create", {
                    action: "https://formspree.io/f/mvzwlgeg", // ID KAMU SUDAH TERPASANG
                    title: "Get in Touch",
                    fields: [
                        {
                            type: "email",
                            label: "Email:",
                            name: "email",
                            required: true,
                            placeholder: "your@email.com"
                        },
                        {
                            type: "textarea",
                            label: "Message:",
                            name: "message",
                            placeholder: "What's on your mind?",
                        },
                        { type: "submit" }
                    ],
                    styles: {
                        title: {
                            backgroundColor: "#171717" // Kita ganti abu-abu ke hitam gelap biar Vibe-nya masuk
                        },
                        button: {
                            backgroundColor: "#171717",// Tombol melayang hitam
                            bottom: "50px",
                        }
                    }
                });
            }
        }
    }, [])

    return null
}