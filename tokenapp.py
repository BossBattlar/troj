from seleniumwire import webdriver as wired
from time import sleep
from selenium import webdriver
from tkinter import messagebox 
import pyperclip

def gtf():
    driver = wired.Chrome()
    tok=""
    driver.get('https://tesseractonline.com/')
    while True:
        if 'https://tesseractonline.com/student' in driver.current_url:
            sleep(3)
            break
    for request in driver.requests:
        if request.response:
            tok=request.headers['authorization']
            try:
                if 'Bearer' in tok:
                    tok=tok.replace("Bearer ","")
                    break
            except:pass
    driver.close()
    ltok=""
    for i in tok:
        ltok+=chr(ord(i)+3)
    return ltok
    
tok=gtf()
lg=messagebox.askquestion("Lisa","Hit yes to copy to key board")
if lg=='yes':
    pyperclip.copy(tok)
    messagebox.showinfo("Lisa","The token is copied past it in website")
else:
    messagebox.showinfo("Lisa","Thank You")