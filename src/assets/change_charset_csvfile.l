# Change csv file charset

for CSV in $(ls *.csv)
do
    echo 'File : ' ${CSV}
    mv ${CSV} ${CSV}.iso8851 && iconv --from-code=ISO_8859-1 --to-code=UTF-8 ${CSV}.iso8851 --output=${CSV} && echo 'Fichier converti' || echo 'Problème de conversion' 
done

rm *.iso8851
