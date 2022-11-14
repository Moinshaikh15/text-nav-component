import streamlit as st
from st_textnav_8 import textnav
import json
f =open('text.json')
data=json.load(f)
st.markdown("--")
textnav(text=data["text"],start_char=250,end_char=300)