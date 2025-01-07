from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
import unittest

class LastPageEmailTest(unittest.TestCase):
    def setUp(self):
        # Configura el navegador (puedes usar 'chrome' o 'firefox')
        options = webdriver.ChromeOptions()
        options.add_argument('--headless')  # Ejecutar en modo headless
        options.add_argument('--no-sandbox')
        options.add_argument('--disable-dev-shm-usage')
        self.driver = webdriver.Chrome(options=options)

        # URL de la aplicación en Docker
        self.base_url = "http://localhost:3500"  # Cambia el puerto si es necesario

    def test_send_email(self):
        driver = self.driver
        driver.get(f"../../front-end/src/pages/lastPage.tsx")  # Asegúrate de que la ruta sea correcta

        # Espera a que la página cargue
        wait = WebDriverWait(driver, 10)

        # Verificar que se muestra el score
        score_element = wait.until(
            EC.presence_of_element_located((By.XPATH, "//h1[contains(text(), 'SCORE:')]"))
        )
        self.assertIn("SCORE:", score_element.text)

        # Hacer clic en el ícono de email para mostrar el input
        email_icon = wait.until(EC.element_to_be_clickable((By.XPATH, "//a[contains(@href, '#')]/child::*[name()='svg']")))
        email_icon.click()

        # Esperar a que el input de email aparezca
        email_input = wait.until(
            EC.presence_of_element_located((By.XPATH, "//input[@type='email']"))
        )

        # Rellenar el email y enviar
        email_input.send_keys("test@example.com")
        submit_button = driver.find_element(By.XPATH, "//button[@type='submit']")
        submit_button.click()

        # Verificar que aparece el mensaje de éxito
        success_message = wait.until(
            EC.presence_of_element_located((By.XPATH, "//p[contains(text(), 'Data sent successfully!')]"))
        )
        self.assertEqual(success_message.text, "Data sent successfully!")

    def tearDown(self):
        self.driver.quit()

if __name__ == "__main__":
    unittest.main()
