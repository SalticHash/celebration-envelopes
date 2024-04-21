# builtin
from io import BytesIO

# others
from qrcode import QRCode
from flask import Response

def generate_qr_image(data: str) -> Response:
    qr = QRCode()
    qr.add_data(data)

    img = qr.make_image()

    # Create a BytesIO object to hold the image data in memory
    img_io = BytesIO()
    img.save(img_io, format='PNG')
    img_io.seek(0)

    # Return the image as a response with appropriate headers
    return Response(img_io.getvalue(), mimetype="image/png")
